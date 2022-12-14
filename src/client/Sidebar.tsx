import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './Context';

import { IconButton, Typography } from '@mui/material'; //took out Box
import Tooltip from '@mui/material/Tooltip';

import HubIcon from '@mui/icons-material/Hub';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LiveHelpTwoToneIcon from '@mui/icons-material/LiveHelpTwoTone';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseFullscreenTwoToneIcon from '@mui/icons-material/CloseFullscreenTwoTone';
import InsertChartTwoToneIcon from '@mui/icons-material/InsertChartTwoTone';
import AddchartTwoToneIcon from '@mui/icons-material/AddchartTwoTone';
import ScatterPlotTwoToneIcon from '@mui/icons-material/ScatterPlotTwoTone';

import { AppProps } from './interfaces';
import { ReactElement } from 'react';

function Sidebar(): ReactElement {
	const [active, setActive] = useState<boolean | null>(false); // state used to toggle sidebar collapse feature

	const { darkModeOn, setUser, user } = useContext<AppProps>(Context);

	function activateSidebar(): void {
		setActive((old) => !old);
	}

	const navigate = useNavigate();
	/* routes for collapsed icons */
	function goToSignup() {
		navigate('/signup');
	}

	return (
		<div
			className={active ? 'sidebar-reg' : 'sidebar-mobile'}
			id={darkModeOn ? 'sidebar-dark' : 'sidebar-light'}
		>
			<div
				className="menu-icon"
				onClick={activateSidebar}
			>
				{!active ? (
					<Tooltip
						title="Expand"
						arrow
					>
						<IconButton>
							<MenuTwoToneIcon className="menu"></MenuTwoToneIcon>
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip
						title="Collapse"
						arrow
					>
						<IconButton>
							<CloseFullscreenTwoToneIcon className="close-icon"></CloseFullscreenTwoToneIcon>
						</IconButton>
					</Tooltip>
				)}
			</div>
			<nav>
				<ul className={active ? 'ul-item' : 'ul-item-icon'}>
					<li>
						<Tooltip 
							title='Dashboard 2' 
							arrow placement='right-start'>
							<IconButton
								className="icon"
								size="large"
								sx={{ '&:hover': { backgroundColor: '#22A39F' } }}
							>
								<AddchartTwoToneIcon
									onClick={() => navigate('/')}
								></AddchartTwoToneIcon>
							</IconButton>
						</Tooltip>
						<Link to="/">
							<Typography>Dashboard</Typography>
						</Link>
					</li>

					<li>
						<Tooltip
							title="Visualizer"
							arrow placement="right-start"
						>
							<IconButton
								className="icon"
								size="large"
								sx={{ '&:hover': { backgroundColor: '#22A39F' } }}
							>
								<ScatterPlotTwoToneIcon
									onClick={() => navigate('/visualizer')}
								></ScatterPlotTwoToneIcon>
							</IconButton>
						</Tooltip>
						<Link to="/visualizer">
							<Typography>Visualizer</Typography>
						</Link>
					</li>

					<li>
						<Tooltip
							title="Cluster"
							arrow placement="right-start"
						>
							<IconButton
								className="icon"
								size="large"
								sx={{ '&:hover': { backgroundColor: '#22A39F' } }}
							>
								<HubIcon onClick={() => navigate('/cluster')}></HubIcon>
							</IconButton>
						</Tooltip>
						<Link to='/cluster'>
							<Typography>Cluster</Typography>
						</Link>
					</li>

					<li>
						<Tooltip
							title="FAQ"
							arrow placement="right-start"
						>
							<IconButton
								className="icon"
								size="large"
								sx={{ '&:hover': { backgroundColor: '#22A39F' } }}
							>
								<LiveHelpTwoToneIcon
									onClick={() => navigate('/faq')}
								></LiveHelpTwoToneIcon>
							</IconButton>
						</Tooltip>
						<Link to="/faq">
							<Typography>FAQ</Typography>
						</Link>
					</li>
				</ul>

				<div id={active && 'logout-icon'}>
					{' '}
					{/* just for conditional hover effect of logout icon */}
					<ul className={active ? 'ul-item' : 'ul-item-icon'}>
						{/* Logout button, sets user state to null */}
						<li>
							<Tooltip
								title="Logout"
								arrow placement="right-start"
							>
								<IconButton
									/* onClick={() => setUser(null)} */
									className="icon"
									size="large"
									sx={{ '&:hover': { backgroundColor: '#fc8181' } }}
								>
									<LogoutTwoToneIcon
										id="logout"
										onClick={() => setUser(null)}
									></LogoutTwoToneIcon>
								</IconButton>
							</Tooltip>

							<Link to="/">
								{' '}
								{/* must set this to login page directly, req'd type for link component, set to /login */}
								<Typography onClick={() => setUser(null)}>Logout</Typography>
								{/* React doesn't like the onClick being here but has to be here for full bar onClick */}
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default Sidebar;
