export const initialState = {
  user: {
    name: '',
    email: '',
    location: '',
    wallet: 500,
    pax: 0,
    coordinates: [],
    activeBus: '',
  },
  busses: [
    {
      bus: '',
      eta: 0,
      from: '',
      to: '',
      totalSeats: 0,
      seatsLeft: 0,
      price: 0,
      busStatus: 'Good',
      coordinates: [],
    },
  ],
  activeBus: {
    bus: 'WB05C',
    eta: 15,
    from: 'Jammu',
    to: 'Udhampur',
    totalSeats: 50,
    seatsLeft: 20,
    price: 100,
    busStatus: 'Good',
    coordinates: [],
    isArrived: false,
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...initialState,
        user: action.user,
      };

    case 'SET_BUS':
      return {
        ...initialState,
        busses: action.busses,
      };

    case 'SET_ACTIVE':
      return {
        ...initialState,
        activeBus: action.activeBus,
      };

    default:
      return state;
  }
}
export default reducer;
