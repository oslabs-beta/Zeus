import * as React from 'react';
import { useState, useEffect } from 'react';
import Pod from './Pod';
import * as d3 from 'd3-force';

//import {ForceGraph} from "@d3/force-directed-graph"

export const Dashboard: React.FC = () => {
	const [nodes, setNodes]: any = useState([]);

	//fetching to the backend
	useEffect(() => {
		fetch('/cluster', { headers: { 'Content-Type': 'application/json' } }) //{headers: { 'Content-Type': 'application/json' },}
			.then((data) => data.json())
			.then((data) => {
				console.log('this is fetching from the  backend:', data);
				for (let i = 0; i < data.Name.length; i++) {
					//looping through the objet of arrays
					setNodes((oldArray: any) => [
						...oldArray,
						{
							Namespace: data.Namespace[i],
							Name: data.Name[i],
							CPU_Requests: data.CPU_Requests[i],
							CPU_Limits: data.CPU_Limits[i],
							Memory_Requests: data.Memory_Requests[i],
							Memory_Limits: data.Memory_Limits[i],
							Age: data.Age[i],
						},
					]);
				}
			})
			.catch((err) => console.log(err));
		///create variable to store the values from the
	}, []);

	// console.log('nodes', nodes);

	//Rendering/passing props to Pod component
	const podProps: any[] = [];
	nodes.forEach((info: Object = {}, i: number) => {
		podProps.push(
			<Pod
				info={info}
				key={i}
			></Pod>
		);
	});
	console.log('pod', podProps);

	//creating visualizer with d3
	const nodesArray: any[] = [];
	podProps.forEach((p, i) => {
		// node resources
		nodesArray.push(p.props.info);
	});
	console.log('nodesArray', nodesArray);

	const visualizer = ({ nodesArray: [], links }: any, {} = {}) => {
		// Constructing forces
		const forceNode = d3.forceManyBody().strength(-100);
		//Linkage of nodes (each node has unique id)
		const forceLink = d3.forceLink();
		//creating stimulation: By default the nodes should be in an array to work
		//nodes is an array passed from line 39
		const simulation = d3
			.forceSimulation(nodes)
			//makes each node repel each other
			.force('charge', d3.forceManyBody())
			//size of node
			.force('center', d3.forceCenter(400, 400))
			//to start stimulator -updates position of each tick (node)
			.on('tick', () => {});
		console.log('simulation', simulation);
	};

	// visualizer({});

	return (
		<div>
			<div>{podProps}</div>
		</div>
	);
};

///private/var/folders/_y/vn2b15j12t161bb71w16rgn00000gn/T
{
	/* <iframe
	src="http://localhost:3001/d-solo/bSUQyqO4z/zeus-monitoring-dashboard?orgId=1&from=1669661032419&to=1669662832419&panelId=2"
	width="1000"
	height="500"
	frameBorder="0"
></iframe> */
}
{
	/* <iframe src="http://localhost:3001/d-solo/bSUQyqO4z/zeus-monitoring-dashboard?orgId=1&refresh=10s&panelId=2" width="1000" height="500" frameBorder="0"></iframe> */
}

// export default Dashboard;
// function runForceGraph(
// 	current: any,
// 	linksInfo: any,
// 	nodeInfo: any,
// 	nodeHoverTooltip: any
// ) {
// 	throw new Error('Function not implemented.');
// }

/*
	const visualization = () => {
		const chart = ForceGraph(nodes, {
			nodeName: (name: { Name: any }) => name.Name,
			nodeCPU_Request: (val: { CPU_Requests: any }) => val.CPU_Requests,
			nodeCPU_Limit: (val: { CPU_Limits: any }) => val.CPU_Limits,
			nodeMemory_Request: (val: { Memory_Requests: any }) =>
				val.Memory_Requests,
			nodeMemory_Limit: (val: { Memory_Limits: any }) => val.Memory_Limits,
			nodeAge: (val: { Age: any }) => val.Age,
		});
		console.log('this is ForceGraph object:', chart);
	};*/
