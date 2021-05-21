import constants from './constants';

const initialState = [];

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case constants.ADD_TRANSACTION:
            const transactionIndex = state.findIndex(
                (transaction) => transaction['accId'] === action.payload.accId
            );
            return transactionIndex >= 0
                ? [
                      ...state.filter(
                          (transaction) =>
                              transaction['accId'] !== action.payload.accId
                      ),
                      {
                          accId: action.payload.accId,
                          transactionData: action.payload.transaction
                      }
                  ]
                : [
                      ...state,
                      {
                          accId: action.payload.accId,
                          transactionData: action.payload.transaction
                      }
                  ];
        case constants.CLEAR:
            return [
                ...state.filter(
                    (transaction) => transaction.accId !== action.payload.accId
                )
            ];
        case constants.CLEAR_ALL:
            return [];
        default:
            return state;
    }
}
