import React from 'react'
import {
	GridColumnMenuContainer,
	GridColumnMenuFilterItem,
	GridColumnMenuHideItem,
} from '@mui/x-data-grid'

const CustomColumnMenu = props => {
	const { hideMenu } = props
	return (
		<GridColumnMenuContainer {...props}>
			<GridColumnMenuFilterItem onClick={hideMenu} {...props} />
			<GridColumnMenuHideItem onClick={hideMenu} {...props} />
		</GridColumnMenuContainer>
	)
}

export default CustomColumnMenu
