import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PeopleIcon from "@material-ui/icons/People";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	}
});

export const SideBar = () => {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const toggleDrawer = (side, open) => event => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const menuItems = [
		{
			label: "Project Tasks",
			url: "",
			icon: <FormatListNumberedIcon />
		},
		{
			label: "Team members",
			url: "",
			icon: <PeopleIcon />
		},
		{
			label: "Calendar",
			url: "",
			icon: <DateRangeIcon />
		},
		{
			label: "Chat",
			url: "",
			icon: <ChatIcon />
		}
	];

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}>
			<List>
				{menuItems.map((item, index) => (
					<ListItem button key={item.label}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.label} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Completed", "In Progress", "Removed"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	const fullList = side => (
		<div
			className={classes.fullList}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}>
			<List>
				{["Project Tasks", "Team members", "Calendar", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Completed", "In Progress", "Removed"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<Button onClick={toggleDrawer("left", true)}>
				<i className="far fa-arrow-alt-circle-right h3" />
			</Button>
			<Drawer open={state.left} onClose={toggleDrawer("left", false)}>
				{sideList("left")}
			</Drawer>
		</div>
	);
};