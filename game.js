// 해적 룰렛 게임 로직

// 플레이어 클래스 정의
class Player {
    constructor(name) {
        this.name = name; // 플레이어 이름
    }
}

// 슬롯 클래스 정의
class Slot {
    constructor(id) {
        this.id = id; // 슬롯 고유 ID
        this.state = 'empty'; // 슬롯 상태: empty(비어있음), full(채워짐), pirate(해적)
    }
}

// 게임 클래스 정의
class Game {
    constructor() {
        this.players = []; // 플레이어 목록
        this.slots = []; // 슬롯 목록
        this.currentPlayerIndex = 0; // 현재 턴 플레이어 인덱스
        this.gameState = 'setup'; // 게임 상태: setup(설정), playing(진행 중), ended(종료)
        console.log('게임 초기화됨. 현재 상태: ', this.gameState); // 게임 초기화 로그
    }

    // 플레이어 추가
    addPlayers(playerNames) {
        this.players = playerNames.split(',')
            .map(name => name.trim())
            .filter(name => name) // 빈 이름 제거
            .map(name => new Player(name));
        console.log('플레이어 추가됨: ', this.players.map(p => p.name)); // 플레이어 추가 로그
    }

    // 슬롯 생성
    createSlots() {
        const playerCount = this.players.length;
        let slotCount;

        // 플레이어 수에 따른 슬롯 개수 결정
        if (playerCount < 4) {
            slotCount = 12;
        } else if (playerCount >= 4 && playerCount <= 8) {
            slotCount = 16;
        } else {
            slotCount = 20;
        }
        console.log('총 슬롯 개수: ', slotCount); // 슬롯 개수 로그

        // 슬롯 객체 생성
        for (let i = 0; i < slotCount; i++) {
            this.slots.push(new Slot(i + 1));
        }

        // 무작위로 해적 슬롯 지정
        const pirateSlotIndex = Math.floor(Math.random() * slotCount);
        this.slots[pirateSlotIndex].state = 'pirate';
        console.log('해적 슬롯 지정됨 (ID: ', this.slots[pirateSlotIndex].id, ')'); // 해적 슬롯 로그
    }

    // 플레이어 수 유효성 검사
    validatePlayerCount() {
        const playerCount = this.players.length;
        if (playerCount === 0) {
            console.warn('유효성 검사 실패: 플레이어 이름이 입력되지 않았습니다.'); // 유효성 검사 실패 로그
            return "Please enter player names."; // 이름이 없는 경우
        }
        if (playerCount < 2 || playerCount > 12) {
            console.warn('유효성 검사 실패: 플레이어 수가 범위를 벗어났습니다 (', playerCount, ').'); // 유효성 검사 실패 로그
            return "Number of players must be between 2 and 12."; // 플레이어 수 범위 초과
        }
        console.log('플레이어 수 유효성 검사 통과.'); // 유효성 검사 통과 로그
        return null; // 유효성 통과
    }

    // 다음 턴으로 진행
    nextTurn() {
        this.currentPlayerIndex++;
        if (this.currentPlayerIndex >= this.players.length) {
            this.currentPlayerIndex = 0; // 마지막 플레이어 후 첫 플레이어로 돌아감
        }
        console.log('다음 턴으로 진행. 현재 플레이어: ', this.players[this.currentPlayerIndex].name); // 턴 변경 로그
    }

    // 무작위 슬롯 선택 (빈 슬롯 또는 해적 슬롯 대상)
    selectRandomSlot() {
        const availableSlots = this.slots.filter(slot => slot.state !== 'full'); // 'full'이 아닌 슬롯만 필터링
        if (availableSlots.length === 0) {
            console.warn('선택할 수 있는 슬롯이 없습니다 (모든 슬롯이 [full]입니다).'); // 선택할 슬롯이 없는 경우 경고, 사실 나올수 없는 상황
            return null; // 선택할 슬롯이 없으면 null 반환
        }
        const randomIndex = Math.floor(Math.random() * availableSlots.length);
        const selectedSlot = availableSlots[randomIndex];
        console.log('무작위 슬롯 선택됨 (ID: ', selectedSlot.id, ', 상태: ', selectedSlot.state, ')'); // 슬롯 선택 로그
        return selectedSlot;
    }

    // 슬롯 선택 처리
    selectSlot(selectedSlot) {
        console.log('플레이어 ', this.players[this.currentPlayerIndex].name, '가 슬롯 ', selectedSlot.id, '를 선택했습니다.'); // 슬롯 선택 처리 로그
        if (selectedSlot.state === 'empty') {
            selectedSlot.state = 'full'; // 빈 슬롯이면 채움
            console.log('슬롯 ', selectedSlot.id, '가 비어있었습니다. [full]로 변경됨.'); // 슬롯 상태 변경 로그
            return { status: 'continue' }; // 게임 계속
        } else if (selectedSlot.state === 'full') {
            console.log('슬롯 ', selectedSlot.id, '는 이미 [full]입니다. 재선택 필요.'); // 재선택 로그
            return { status: 'reselect' }; // 이미 채워진 슬롯이면 재선택
        } else if (selectedSlot.state === 'pirate') {
            this.gameState = 'ended'; // 해적 슬롯이면 게임 종료
            console.log('슬롯 ', selectedSlot.id, '가 해적 슬롯입니다! 게임 오버!'); // 해적 슬롯 선택 로그
            return { status: 'gameover', loser: this.players[this.currentPlayerIndex] }; // 게임 오버 및 패배자 반환
        }
    }

    // 게임 초기화
    resetGame() {
        this.players = [];
        this.slots = [];
        this.currentPlayerIndex = 0;
        this.gameState = 'setup';
        console.log('게임이 초기화되었습니다. 현재 상태: ', this.gameState); // 게임 초기화 로그
    }
}