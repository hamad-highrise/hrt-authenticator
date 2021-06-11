import { useSelector } from 'react-redux';

function useSelected() {
    const { selected } = useSelector((state) => state);
    return {
        id: selected['id'],
        name: selected['name'],
        issuer: selected['issuer'],
        type: selected['type'],
        suspected: selected['suspected']
    };
}

export default useSelected;
