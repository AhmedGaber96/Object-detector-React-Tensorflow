import React from 'react'
import { useState } from 'react'
// import axios from 'axios'

export default function Regist() {

    //declartion

    let kpi = {
        objective: '',
        kpi_code: '',
        dim: '',
        kpi_type: '',
        process: '',
        kpi: '',
        weight: '',
        score_equation: ''
    }

    let kpiList = [];

    const [managerPMS, setmanagerPMS] = useState({
        position: '',
        password: '',
        bu: '',
        department: '',
        section: '',
        direct_manager: '',
        manager_kpi: [],
    })


    // Console data

    function enteringKPI(e) {
        // let new_kpi = { ...kpi };
        kpi[e.target.name] = e.target.value;
        // setkpi(new_kpi);
        console.log(kpi);
    }

    function getEntryData(e) {
        let myUser = { ...managerPMS };
        myUser[e.target.name] = e.target.value;
        setmanagerPMS(myUser);
        console.log(myUser);
    }

    function displayKPI() {
        let cartona = ``;
        for (let i = 0; i < kpiList.length; i++) {
            cartona += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${kpiList[i].objective}</td>
                    <td>${kpiList[i].kpi_code}</td>
                    <td>${kpiList[i].dim}</td>
                    <td>${kpiList[i].kpi_type}</td>
                    <td>${kpiList[i].process}</td>
                    <td>${kpiList[i].kpi}</td>
                    <td>${kpiList[i].weight}</td>
                    <td>${kpiList[i].score_equation}</td>
                </tr>     
            `
        }
        document.getElementById("displayBody").innerHTML = cartona;
    }


    // Buttons Fuctions

    function addKPI(e) {
        e.preventDefault();
        let new_kpi = {
            objective: document.getElementById("objective").value,
            kpi_code: document.getElementById("kpi_code").value,
            dim: document.getElementById("dim").value,
            kpi_type: document.getElementById("kpi_type").value,
            process: document.getElementById("process").value,
            kpi: document.getElementById("kpi").value,
            weight: document.getElementById("weight").value,
            score_equation: document.getElementById("score_equation").value
        }
        kpiList.push(new_kpi)
        console.log(kpiList);
        clearkpi()
        displayKPI()
    }

    function clearkpi() {
        document.getElementById("objective").value = ""
        document.getElementById("kpi_code").value = ""
        document.getElementById("dim").value = ""
        document.getElementById("kpi_type").value = ""
        document.getElementById("process").value = ""
        document.getElementById("kpi").value = ""
        document.getElementById("weight").value = ""
        document.getElementById("score_equation").value = ""
    }


    function clearInfo() {
        document.getElementById("position").value = "";
        document.getElementById("password").value = "";
        document.getElementById("bu").value = "";
        document.getElementById("department").value = "";
        document.getElementById("section").value = "";
        document.getElementById("direct_manager").value = "";
    }


    // API Calling 

    async function submitting(e) {
        e.preventDefault();
        // let options = {
        //     method: 'POST',
        //     url: `https://4dcaf803-ef0a-42da-87ce-e51f73ab942c-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/register/collections/pms`,
        //     headers: {
        //         'X-Cassandra-Token': 'AstraCS:tlJRciewhmadMCQIufQFeMhM:253815878c65ddd2296a46ee5e92359de456ffe17cbaed5ea7cd0c6eb1ff7b49',
        //         'Content-Type': 'application/json',
        //         'accept': 'application/json'
        //     }
        // }
        // let { dataSent } = await axios.post(`https://4dcaf803-ef0a-42da-87ce-e51f73ab942c-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/register/collections/pms`, managerPMS, options)
        managerPMS.manager_kpi = kpiList
        console.log(managerPMS);
        console.log("hi");
        document.getElementById("displayBody").innerHTML = ``;
        localStorage.setItem(`${JSON.stringify(managerPMS.position)}`,JSON.stringify(managerPMS))
        clearInfo();
        clearkpi()
    }

    return <>
        <section className='mx-auto my-5 container'>
            <form onSubmit={submitting}>
                <div className='d-flex flex-column py-2'>
                    <h6 className='h3 pt-3'><span className="badge bg-info">Info</span></h6>
                    <div className="row">
                        <div className="col-lg-6">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='position' id='position' placeholder='Job Title' />
                        </div>
                        <div className="col-lg-6">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='password' id='password' placeholder='New Password' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='bu' id='bu' placeholder='Business Unit' />
                        </div>
                        <div className="col-lg-3">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='department' id='department' placeholder='Department' />
                        </div>
                        <div className="col-lg-3">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='section' id='section' placeholder='Section' />
                        </div>
                        <div className="col-lg-3">
                            <input onChange={getEntryData} className='my-2 form-control' type="text" name='direct_manager' id='direct_manager' placeholder='Direct Manager' />
                        </div>
                    </div>
                </div>
                <h6 className='h3 pt-3'><span className="badge bg-info">KPIs</span></h6>
                <div className="row">
                    <div className="col-lg-6">
                        <div className='d-flex flex-column py-2'>
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='objective' id='objective' placeholder='Objective' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='kpi_code' id='kpi_code' placeholder='KPI code' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='dim' id='dim' placeholder='Dimension' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='kpi_type' id='kpi_type' placeholder='KPI Type' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='process' id='process' placeholder='Process' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='kpi' id='kpi' placeholder='KPI' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='weight' id='weight' placeholder='Weight' />
                            <input onChange={enteringKPI} className='my-2 form-control' type="text" name='score_equation' id='score_equation' placeholder='Score Equation' />
                            <div className='text-end'>
                                <h6>
                                    <span className="badge bg-info mx-1">Add new KPI</span>
                                    <button type='button' onClick={addKPI} className='btn btn-outline-danger'><i className="fa-solid fa-plus"></i></button>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className={` col-lg-6 py-3`}>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>objective</th>
                                    <th>Code</th>
                                    <th>Dimension</th>
                                    <th>Type</th>
                                    <th>Process</th>
                                    <th>KPI</th>
                                    <th>Weight</th>
                                    <th>Equation</th>
                                </tr>
                            </thead>
                            <tbody id='displayBody'>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button type='submit' className='btn btn-outline-danger form-control mx-auto'>Register</button>
            </form>
        </section>
    </>
}


