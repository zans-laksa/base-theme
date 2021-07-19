/* eslint-disable react/prop-types */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ChildrenType } from 'Type/Common';

import SwipeToDelete from './SwipeToDelete.component';

/** @namespace Component/Link/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isMobile: state.ConfigReducer.device.isMobile
});

/** @namespace Component/Link/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace Component/Link/Container */
export class SwipeToDeleteContainer extends PureComponent {
    static propTypes = {
        isMobile: PropTypes.bool.isRequired,
        children: ChildrenType.isRequired
    };

    render() {
        const { isMobile, children } = this.props;

        if (!isMobile) {
            return children;
        }

        return (
            <SwipeToDelete
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeToDeleteContainer);
