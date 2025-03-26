import React, { useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const PerformanceDashboard = () => {
    const [data, setData] = useState([]);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/performance")
            .then((res) => res.json())
            .then((data) => {
                const updatedData = data.map(person => ({
                    ...person,
                    Stability: person["Mean Performance"] / (person["Variance"] + 1) 
                }));
                setData(updatedData);
                const bestPerformer = updatedData.reduce((best, person) => {
                    if (!best || person.Stability > best.Stability) {
                        return person;
                    }
                    return best;
                }, null);
                setWinner(bestPerformer);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Performance Dashboard</h1>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Person</th>
                        <th>Mean Performance</th>
                        <th>Variance</th>
                        <th>Stable Performance</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((person, index) => (
                        <tr key={index}>
                            <td>{person.index || "Unknown"}</td>
                            <td>{person["Mean Performance"]?.toFixed(2) || "N/A"}</td>
                            <td>{person["Variance"]?.toFixed(2) || "N/A"}</td>
                            <td>{person.Stability?.toFixed(4) || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3 className="text-center">Average</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <XAxis type="category" dataKey="index" name="Person" />
                            <YAxis type="number" dataKey="Mean Performance" name="Mean" />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter name="Mean" data={data} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                <div className="col-md-6">
                    <h3 className="text-center">Spread</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <XAxis type="category" dataKey="index" name="Person" />
                            <YAxis type="number" dataKey="Variance" name="Variance" />
                            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                            <Scatter name="Variance" data={data} fill="#82ca9d" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {winner && (
                <div className="alert alert-primary text-center mt-4">
                    <h4>🏆 Best Stable Performer: <b>{winner.index}</b></h4>
                    <p>Average Performance Score: <b>{winner["Mean Performance"].toFixed(2)}</b></p>
                    <p>Variance: <b>{winner["Variance"].toFixed(2)}</b></p>
                    <p>Stable Performance Score: <b>{winner.Stability.toFixed(4)}</b></p>
                </div>
            )}
        </div>
    );
};

export default PerformanceDashboard;