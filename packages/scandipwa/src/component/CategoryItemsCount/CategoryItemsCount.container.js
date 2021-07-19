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

import { connect } from 'react-redux';

import CategoryItemsCount from './CategoryItemsCount.component';

/** @namespace Component/CategoryItemsCount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    totalItems: state.ProductListReducer.totalItems
});

/** @namespace Component/CategoryItemsCount/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItemsCount);
