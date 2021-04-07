import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

function Boundry({ children, ...props }) {
    const { error } = useSelector((state) => state.alert);

    return (
        <>
            {!error.isOccurred ? (
                children(props)
            ) : (
                <View>
                    <Text>An Error occurred!</Text>
                </View>
            )}
        </>
    );
}

export default Boundry;
