import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PeopleIcon from "@material-ui/icons/People";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ChatIcon from "@material-ui/icons/Chat";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { ProfileMenu } from "./profileMenu";
import Grid from "@material-ui/core/Grid";
import { Tasks } from "../tasks/tasks";
import { CompletedTasks } from "../tasks/completedTask";
import { Calendar } from "../../calendar/calendar";
import { Box } from "@material-ui/core";
import { Context } from "../../../store/appContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap"
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1
		}
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export const SideBar = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const pluralize = count => (count > 1 ? `${count}` : `${count}`);
	const { store, actions } = useContext(Context);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	//Items for the side menu
	const menuItems = [
		{
			label: "Project Tasks",
			url: "/dashboard/tasks",
			icon: <FormatListNumberedIcon />
		},
		{
			label: "Team members",
			url: "",
			icon: <PeopleIcon />
		},
		{
			label: "Calendar",
			url: "/dashboard/calendar",
			icon: <DateRangeIcon />
		},
		{
			label: "Chat",
			url: "",
			icon: <ChatIcon />
		}
	];

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open
						})}>
						<DoubleArrowRoundedIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Project Management Tool
					</Typography>
					<Box ml={"auto"}>
						<IconButton aria-label="show 3 new notifications" color="inherit">
							<Badge
								badgeContent={<span className="float-right">{pluralize(store.list.length)}</span>}
								color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Box>
					<ProfileMenu ml={"auto"} />
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{menuItems.map((item, index) => (
						<ListItem button key={item.label} component={Link} to={item.url}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			{/* <main className={classes.content}>
				<div className={classes.toolbar}>
					<Grid container spacing={3}>
						<Grid item md={12}>
							<Tasks />
						</Grid>
						<Grid item md={12}>
							<CompletedTasks />
						</Grid>

						<Calendar />
					</Grid>
					<Typography paragraph />
				</div>
			</main>*/}
		</div>
	);
};
