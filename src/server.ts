import app from "./app";
import { Server } from "http";

const NODE_ENV = process.env.NODE_ENV || "development";

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
	console.log(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
});

export default server;