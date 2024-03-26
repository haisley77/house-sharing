import create from 'zustand';

// 필터(header) 상태 타입 정의
interface HomeFilterState {
  School: boolean;
  Subway: boolean;
  Apartment: boolean;
  Pets: boolean;
  // 상태를 업데이트하는 함수
  selectFilter: (newState: Partial<HomeFilterState>) => void;
}

// 초기 상태
const initialState: HomeFilterState = {
  School: false,
  Subway: false,
  Apartment: false,
  Pets: false,
  selectFilter: (newState: Partial<HomeFilterState>) => {},
};

// zustand 스토어 생성
export const useHomeStore = create<HomeFilterState>((set) => ({
  ...initialState,
  // 상태 변경 함수 정의
  selectFilter: (newState) => set((state) => ({ ...state, ...newState })),
}));
