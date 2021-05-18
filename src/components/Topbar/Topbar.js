import React from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Typography } from '../../theme';
import { IconContainer } from '../iconButton_2';

import styles from './topbar.styles';

const Topbar = (props) => {
    const { topbarLeft, topbarMiddle, topbarRight, title } = props;
    return (
        <View style={styles.container}>
            <View style={[styles.section, styles.left]}>
                {topbarLeft.visible && (
                    <IconContainer onPress={topbarLeft.onPress}>
                        {topbarLeft?.visible && (
                            // <Text>OKAY</Text>
                            <Image
                                style={{
                                    width: topbarLeft?.image?.width || '80%',
                                    height: topbarLeft?.image?.height || '80%'
                                }}
                                source={topbarLeft.image?.source}
                            />
                        )}
                    </IconContainer>
                )}
            </View>

            <View style={[styles.section, styles.middle]}>
                {topbarMiddle.visible && (
                    <Typography.HeaderTitle styles={{ color: 'black' }}>
                        {title}
                    </Typography.HeaderTitle>
                )}
            </View>

            <View style={[styles.section, styles.right]}>
                {topbarRight.visible && (
                    <IconContainer onPress={topbarRight.onPress}>
                        {topbarRight?.image?.source && (
                            <Image
                                style={{
                                    width: topbarRight?.image?.width || '80%',
                                    height: topbarRight?.image?.height || '80%'
                                }}
                                source={topbarRight.image?.source}
                            />
                        )}
                    </IconContainer>
                )}
            </View>
        </View>
    );
};

Topbar.propTypes = {
    topbarRight: PropTypes.object,
    topbarLeft: PropTypes.object,
    topbarMiddle: PropTypes.object,
    title: PropTypes.string
};

Topbar.defaultProps = {
    topbarRight: { visible: false },
    topbarLeft: { visible: false },
    topbarMiddle: { visible: true },
    title: 'Topbar'
};

export default Topbar;
