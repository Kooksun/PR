// UI 조작 로직

let currentGame; // 현재 게임 인스턴스
let manualMode = false; // 수동 모드 상태

// 게임 보드를 렌더링하는 함수
function renderBoard(game) {
    console.log('게임 보드 렌더링 시작...'); // 보드 렌더링 시작 로그
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    const numSlots = game.slots.length; // 슬롯 개수
    const radius = 180; // 원형 배치 반지름
    const gameBoardSize = gameBoard.offsetWidth; // 게임 보드 크기 (정사각형 가정)
    const slotSize = 60; // 슬롯 크기 (CSS에서 가져옴)

    game.slots.forEach((slot, index) => {
        const slotElement = document.createElement('div');
        slotElement.classList.add('slot', slot.state === 'pirate' ? 'empty' : slot.state); // 슬롯 클래스 및 상태 클래스 추가
        slotElement.textContent = slot.id; // 슬롯 번호 표시

        // 원형 배치를 위한 각도 및 위치 계산
        const angle = (index / numSlots) * 2 * Math.PI; // 라디안 단위 각도
        const x = (gameBoardSize / 2) + radius * Math.cos(angle) - (slotSize / 2);
        const y = (gameBoardSize / 2) + radius * Math.sin(angle) - (slotSize / 2);

        slotElement.style.left = `${x}px`;
        slotElement.style.top = `${y}px`;
        // slotElement.style.transform = `rotate(${-angle}rad)`; // 슬롯이 보드 회전에 맞춰 글자가 똑바로 보이도록 역회전

        gameBoard.appendChild(slotElement); // 게임 보드에 슬롯 추가
    });
    console.log('게임 보드 렌더링 완료.'); // 보드 렌더링 완료 로그
}

// 생각 중 애니메이션 표시
function showThinkingAnimation(player) {
    console.log(player.name, '님 생각 중 애니메이션 표시...'); // 생각 중 애니메이션 표시 로그
    const thinkingSpinner = document.getElementById('thinking-spinner');
    // const playerTurnElement = document.getElementById('player-turn'); // 이 줄은 더 이상 필요 없음
    // playerTurnElement.textContent = `${player.name} 님의 턴입니다.`; // 이 줄은 제거
    thinkingSpinner.style.display = 'block'; // 스피너 표시
}

// 생각 중 애니메이션 숨기기
function hideThinkingAnimation() {
    console.log('생각 중 애니메이션 숨기기.'); // 생각 중 애니메이션 숨기기 로그
    const thinkingSpinner = document.getElementById('thinking-spinner');
    thinkingSpinner.style.display = 'none'; // 스피너 숨기기
}

// 플레이어 턴 표시 렌더링
function renderPlayerTurn(game) {
    console.log('플레이어 턴 렌더링 시작...'); // 플레이어 턴 렌더링 시작 로그
    const playerTurnElement = document.getElementById('player-turn');
    playerTurnElement.innerHTML = ''; // 기존 내용 초기화

    game.players.forEach((player, index) => {
        const playerNameSpan = document.createElement('span');
        playerNameSpan.textContent = player.name;
        if (index === game.currentPlayerIndex) {
            playerNameSpan.classList.add('current-player'); // 현재 플레이어 강조
        }
        playerTurnElement.appendChild(playerNameSpan);
        if (index < game.players.length - 1) {
            playerTurnElement.append(' - '); // 플레이어 이름 사이에 구분자 추가
        }
    });
    console.log('플레이어 턴 렌더링 완료. 현재 플레이어: ', game.players[game.currentPlayerIndex].name); // 플레이어 턴 렌더링 완료 로그
}

// 슬롯 회전 애니메이션 적용
function rotateSlots(boardAngle) {
    console.log('슬롯 보드 회전 시작 (각도: ', boardAngle, 'deg)...'); // 슬롯 회전 시작 로그
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.transform = `rotate(${boardAngle}deg)`; // 게임 보드 회전
    gameBoard.classList.add('rotate-board'); // 회전 애니메이션 클래스 추가

    // 각 슬롯에 역회전 적용하여 숫자가 똑바로 보이도록 함
    const slotElements = document.querySelectorAll('.slot');
    slotElements.forEach(slotElement => {
        slotElement.style.transform = `rotate(${-boardAngle}deg)`;
    });
}

// 수동 모드일 때 사용자에게 슬롯 선택을 요청
function promptForManualSlotSelection() {
    const availableSlots = currentGame.slots.filter(slot => slot.state !== 'full');
    if (availableSlots.length === 0) {
        alert('선택할 수 있는 슬롯이 없습니다.');
        return null;
    }

    const currentPlayerName = currentGame.players[currentGame.currentPlayerIndex].name;

    while (true) {
        const input = prompt(`${currentPlayerName}님, 슬롯 번호를 입력하세요 (1-${currentGame.slots.length})`);
        if (input === null) {
            console.log('사용자가 슬롯 선택을 취소했습니다. 무작위 슬롯을 선택합니다.');
            return null; // 사용자가 취소하면 null 반환
        }

        const slotNumber = parseInt(input, 10);
        if (Number.isNaN(slotNumber)) {
            alert('유효한 숫자를 입력하세요.');
            continue;
        }

        if (slotNumber < 1 || slotNumber > currentGame.slots.length) {
            alert(`1부터 ${currentGame.slots.length} 사이의 숫자를 입력하세요.`);
            continue;
        }

        const chosenSlot = currentGame.getSlotByNumber(slotNumber);
        if (!chosenSlot) {
            alert('선택한 슬롯을 찾을 수 없습니다. 다시 시도하세요.');
            continue;
        }

        if (chosenSlot.state === 'full') {
            alert('이미 채워진 슬롯입니다. 다른 슬롯을 선택하세요.');
            continue;
        }

        return chosenSlot;
    }
}

// 선택된 슬롯 처리 공통 로직
function processSelectedSlot(selectedSlot) {
    const currentSlotAngleDegrees = (selectedSlot.id - 1) / currentGame.slots.length * 360; // 선택된 슬롯의 현재 각도 (도 단위)
    const targetAngleDegrees = 90; // 목표 각도 (하단 중앙)
    const boardRotationAngle = targetAngleDegrees - currentSlotAngleDegrees; // 보드 회전 각도 계산
    rotateSlots(boardRotationAngle); // 슬롯 회전 애니메이션

    setTimeout(() => {
        const selectionResult = currentGame.selectSlot(selectedSlot); // 슬롯 선택 결과 처리
        const slotElement = document.querySelector(`.slot:nth-child(${selectedSlot.id})`); // 선택된 슬롯 요소 가져오기

        if (!slotElement) {
            console.warn('선택된 슬롯 요소를 찾을 수 없습니다.');
            return;
        }

        if (selectionResult.status === 'continue') {
            console.log('선택된 슬롯 ', selectedSlot.id, '는 비어있었습니다. 게임 계속.'); // 슬롯 선택 결과 로그
            slotElement.classList.add('full-animation'); // 'full' 애니메이션 클래스 추가
            slotElement.classList.remove('empty'); // 'empty' 클래스 제거
            slotElement.classList.add('full'); // 'full' 클래스 추가
            const currentPlayerNameElement = document.querySelector('#player-turn .current-player');
            if (currentPlayerNameElement) {
                currentPlayerNameElement.classList.add('shake-animation'); // 흔들림 애니메이션 추가
                currentPlayerNameElement.addEventListener('animationend', () => {
                    currentPlayerNameElement.classList.remove('shake-animation'); // 애니메이션 종료 후 클래스 제거
                }, { once: true });
            }

            // 애니메이션 완료 후 다음 턴 진행
            slotElement.addEventListener('transitionend', () => {
                currentGame.nextTurn(); // 다음 턴으로 진행
                renderPlayerTurn(currentGame); // 플레이어 턴 렌더링
                playTurn(); // 다음 턴 시작
            }, { once: true });

        } else if (selectionResult.status === 'reselect') {
            console.log('선택된 슬롯 ', selectedSlot.id, '는 이미 채워져 있습니다. 재선택.'); // 재선택 로그
            playTurn(); // 현재는 턴 재실행
        } else if (selectionResult.status === 'gameover') {
            console.log('선택된 슬롯 ', selectedSlot.id, '는 해적 슬롯입니다! 게임 오버!'); // 게임 오버 로그
            slotElement.classList.remove('empty'); // 'empty' 클래스 제거
            slotElement.classList.add('pirate'); // 해적 슬롯 공개 (빨간색으로 변경)
            const currentPlayerNameElement = document.querySelector('#player-turn .current-player');
            if (currentPlayerNameElement) {
                currentPlayerNameElement.classList.add('shake-animation'); // 흔들림 애니메이션 추가
                currentPlayerNameElement.addEventListener('animationend', () => {
                    currentPlayerNameElement.classList.remove('shake-animation'); // 애니메이션 종료 후 클래스 제거
                }, { once: true });
            }
            showLoserPopup(selectionResult.loser.name); // 패배 팝업 표시
        }
    }, 1000); // 회전 애니메이션을 위한 짧은 지연
}

// 패배 팝업 표시
function showLoserPopup(loserName) {
    console.log(loserName, '님 패배 팝업 표시.'); // 패배 팝업 표시 로그
    const modal = document.getElementById('game-over-modal');
    const messageElement = document.getElementById('game-over-message');
    const animationContainer = document.getElementById('walk-the-plank-animation');
    const stickFigure = animationContainer.querySelector('.stick-figure');

    messageElement.textContent = `${loserName} 님이 해적을 뽑았습니다! 게임 오버!`; // 메시지 설정
    modal.style.display = 'block'; // 모달 표시

    // 애니메이션 시작
    animationContainer.style.display = 'block';
    stickFigure.classList.add('walk-and-fall');
}

// 패배 팝업 숨기기
function hideLoserPopup() {
    console.log('패배 팝업 숨기기.'); // 패배 팝업 숨기기 로그
    const modal = document.getElementById('game-over-modal');
    const animationContainer = document.getElementById('walk-the-plank-animation');
    const stickFigure = animationContainer.querySelector('.stick-figure');

    modal.style.display = 'none'; // 모달 숨기기

    // 애니메이션 리셋
    animationContainer.style.display = 'none';
    stickFigure.classList.remove('walk-and-fall');
}

// 턴 진행 로직
function playTurn() {
    if (!currentGame || currentGame.gameState !== 'playing') {
        return;
    }

    const currentPlayer = currentGame.players[currentGame.currentPlayerIndex];
    showThinkingAnimation(currentPlayer); // 생각 중 애니메이션 표시

    setTimeout(() => {
        hideThinkingAnimation(); // 생각 중 애니메이션 숨기기

        let selectedSlot = null;
        if (currentGame.manualMode) {
            console.log('수동 모드에서 슬롯 선택을 사용자에게 요청합니다.');
            selectedSlot = promptForManualSlotSelection();
            if (selectedSlot === null) { // 사용자가 취소한 경우
                selectedSlot = currentGame.selectRandomSlot(); // 무작위 슬롯 선택
            }
        } else {
            selectedSlot = currentGame.selectRandomSlot(); // 무작위 슬롯 선택
        }

        if (!selectedSlot) {
            console.warn('선택된 슬롯이 없어 턴을 종료합니다.');
            return;
        }

        processSelectedSlot(selectedSlot);
    }, 2000); // 생각 시간
}

// DOMContentLoaded 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 콘텐츠 로드 완료. 게임 설정 준비.'); // DOM 로드 완료 로그
    const startGameButton = document.getElementById('start-game'); // 게임 시작 버튼
    const startRussianRouletteButton = document.getElementById('start-russian-roulette'); // 러시안 룰렛 버튼
    const playerNamesInput = document.getElementById('player-names'); // 플레이어 이름 입력 필드
    const toggleManualModeButton = document.getElementById('toggle-manual-mode'); // 수동 모드 토글 버튼
    const errorElement = document.getElementById('error-message'); // 오류 메시지 표시 요소

    // 초기 버튼 상태 설정
    toggleManualModeButton.textContent = `Manual Mode: ${manualMode ? 'ON' : 'OFF'}`;
    if (manualMode) {
        toggleManualModeButton.classList.add('active');
    } else {
        toggleManualModeButton.classList.remove('active');
    }

    function initializeGame(mode) {
        console.log(`${mode === 'russian' ? '러시안 룰렛' : '기본'} 모드 게임 시작 버튼 클릭됨.`);
        currentGame = new Game({ mode, manualMode: manualMode }); // 새 게임 인스턴스 생성
        const playerNames = playerNamesInput.value; // 플레이어 이름 가져오기

        currentGame.addPlayers(playerNames); // 플레이어 추가
        const errorMessage = currentGame.validatePlayerCount(); // 플레이어 수 유효성 검사

        if (errorMessage) {
            errorElement.textContent = errorMessage; // 오류 메시지 표시
            console.warn('게임 시작 실패: ', errorMessage); // 게임 시작 실패 로그
            return;
        }

        errorElement.textContent = ''; // 오류 메시지 초기화
        currentGame.createSlots(); // 슬롯 생성
        currentGame.gameState = 'playing'; // 게임 상태 업데이트
        renderBoard(currentGame); // 게임 보드 렌더링
        renderPlayerTurn(currentGame); // 플레이어 턴 렌더링

        playTurn(); // 게임 루프 시작
        console.log(`게임 시작 성공. 게임 상태: ${currentGame.gameState}, 모드: ${currentGame.mode}, 수동 모드: ${currentGame.manualMode}`);
    }

    // 게임 시작 버튼 클릭 이벤트
    startGameButton.addEventListener('click', () => initializeGame('standard'));

    // 러시안 룰렛 모드 시작 버튼 클릭 이벤트
    startRussianRouletteButton.addEventListener('click', () => initializeGame('russian'));

    // 수동 모드 토글 버튼 클릭 이벤트
    toggleManualModeButton.addEventListener('click', () => {
        manualMode = !manualMode; // manualMode 상태 토글
        toggleManualModeButton.textContent = `Manual Mode: ${manualMode ? 'ON' : 'OFF'}`; // 버튼 텍스트 업데이트
        toggleManualModeButton.classList.toggle('active', manualMode); // 'active' 클래스 토글
        console.log('수동 모드:', manualMode ? '활성화' : '비활성화'); // 콘솔 로그
    });

    const closeButton = document.querySelector('.close-button'); // 팝업 닫기 버튼
    const resetGameButton = document.getElementById('reset-game-button'); // 게임 재설정 버튼

    // 팝업 닫기 버튼 클릭 이벤트
    closeButton.addEventListener('click', () => {
        console.log('팝업 닫기 버튼 클릭됨. 게임 초기화.'); // 팝업 닫기 로그
        hideLoserPopup(); // 팝업 숨기기
        currentGame.resetGame(); // 게임 초기화
        renderBoard(currentGame); // 보드 다시 렌더링
        renderPlayerTurn(currentGame); // 플레이어 턴 다시 렌더링
    });

    // 게임 재설정 버튼 클릭 이벤트
    resetGameButton.addEventListener('click', () => {
        console.log('게임 재설정 버튼 클릭됨. 게임 초기화.'); // 게임 재설정 로그
        hideLoserPopup(); // 팝업 숨기기
        currentGame.resetGame(); // 게임 초기화
        renderBoard(currentGame); // 보드 다시 렌더링
        renderPlayerTurn(currentGame); // 플레이어 턴 다시 렌더링
    });
});