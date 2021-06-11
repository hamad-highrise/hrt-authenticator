const { useSelector } = require('react-redux');

function useUtils() {
    const { loading, error, isConnected } = useSelector((state) => state.utils);
    return { loading, error, isConnected };
}

export default useUtils;
