"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware = require('./middleware');
const userController = require('./controllers/userController');
const prom_client_1 = __importDefault(require("prom-client"));
// import cluster from 'cluster';
const app = (0, express_1.default)();
const cors = require('cors');
const PORT = 3000;
//  const fetch = require('node-fetch');
// const child_process = require('child_process');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
dotenv_1.default.config();
// collecting our default metrics from Prometheus
// https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors
const collectDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
// register our metrics to another registry
const Registry = prom_client_1.default.Registry;
const register = new Registry();
// collect our default metrics
collectDefaultMetrics({ register });
// label our metrics
register.setDefaultLabels({
    app: 'zeus-api',
});
app.get('/', (req, res) => {
    console.log('Backend & Frontend speaking...');
    res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
});
app.get('/user', userController.getUser, (req, res) => {
    console.log('Getting user is working...', res.locals.foundUser);
    return res.sendStatus(200).json(res.locals.foundUser);
});
app.post('/user', userController.createUser, (req, res) => {
    return res.status(200).json(res.locals.newUser);
});
// app.get('/metrics', async (req: Request, res: Response) => {
// 	console.log('Getting metrics is working...');
// 	res.setHeader('Content-type', register.contentType);
// 	res.end(await register.metrics());
// });
// app.get('/apis/metrics.k8s.io/v1beta1', async (req: Request, res: Response) => {
// 	console.log('Getting metrics resources is working...');
// 	res.sendStatus(200);
// });
// app.get(
// 	'/apis/metrics.k8s.io/v1beta1/nodes',
// 	async (req: Request, res: Response) => {
// 		try {
// 			const kubeMetrics = await fetch('http://localhost:8085/metrics');
// 			console.log(kubeMetrics);
// 			res.sendStatus(200).send(JSON.stringify({metrics:kubeMetrics}));
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// );
// app.get(
// 	'/apis/metrics.k8s.io/v1beta1/nodes/zeus ',
// 	async (req: Request, res: Response) => {
// 		console.log('Getting metrics resources is working...');
// 		res.sendStatus(200);
// 	}
// );
// app.get(
// 	'/cluster',
// 	middleware.getClusterInfo,
// 	(req: Request, res: Response) => {
// 		console.log('Getting cluster is working...', res.locals.clusterInfo);
// 		return res.status(200).json(res.locals.clusterInfo);
// 	}
// );
app.use('*', (req, res) => {
    return res.status(404);
});
app.use((err, req, res, next) => {
    const defaultError = {
        log: 'express error handler triggered',
        status: 500,
        message: { err: `${err}: An error occurred` },
    };
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, () => {
    console.log(`************************* EXPRESS server is listening on http://localhost:${PORT}/`);
    console.log(`************************* Frontend listening on  http://localhost:${8080}/`);
});
