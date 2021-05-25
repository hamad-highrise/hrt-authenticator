import constants from './constants';

const select = (accId) => (dispatch, getState) => {
    const { accounts } = getState();
    const selectedAccount = accounts.find((account) => account['id'] === accId);
    dispatch({ type: constants.SELECT, payload: { account: selectedAccount } });
};
const clearSelected = () => ({ type: constants.DESELECT });

export default { select, clearSelected };
