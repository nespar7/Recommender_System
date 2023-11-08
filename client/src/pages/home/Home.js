import "./Home.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/Topbar/Topbar";

export default function Home() {
	const { user } = useContext(AuthContext);

	return (
		<>
			<Topbar />
			<h1>Hello {user.username}</h1>
		</>
	);
}
