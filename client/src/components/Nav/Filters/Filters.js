import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { 
    getAllActivities, 
    orderByNameAZ,
    orderByPopulationAZ,
    orderByActivities,
} from '../../../redux/actions/index.js'

export default function Filters () {
    const dispatch = useDispatch();
    const activities = useSelector(state => state.activities);
    let [/*sort*/, setSort] = useState();

    // monto las actividades para el <select> 'Activities'
    useEffect(() => {
        dispatch(getAllActivities());
    }, [dispatch]);

    const handleOrder = e => {
        e.preventDefault(e);
        let valueAZ = document.getElementById('order-AZ').value;

        if (e.target.value === 'name') {
            dispatch(orderByNameAZ(valueAZ));
        } else {
            dispatch(orderByPopulationAZ(valueAZ));
        };

        setSort(e.target.value);
    };

    const handleAZ = e => {
        e.preventDefault(e);
        let valueOrder = document.getElementById('order-by').value;

        if (valueOrder === 'Order by') {
            document.getElementById('order-by').value = 'name';
            valueOrder = 'name';
        }

        if (valueOrder === 'name') {
            dispatch(orderByNameAZ(e.target.value));
        } else { 
            dispatch(orderByPopulationAZ(e.target.value)) 
        };

        setSort(e.target.value);
    };

    const handleActivities = e => {
        e.preventDefault(e);
        dispatch(orderByActivities(e.target.value))
    };

    return (
        <div>
            <div className="label-filters">
                    Order By
            </div>
            <div className="filters">
                <select defaultValue='Order by' id="order-by" onChange={handleOrder}>
                    <option disabled>Order by</option>
                    <option value='name'>Name</option>
                    <option value='population'>Population</option>
                </select>

                <select defaultValue='asc' id="order-AZ" onChange={handleAZ}>
                    <option value='asc'>Ascendent</option>
                    <option value='des'>Descendent</option>
                </select>

                <select defaultValue='Activities' id="activities" onChange={handleActivities}>
                    <option value="Activities">Activities</option>
                    {
                        activities?.map((a, index) => 
                            <option value={a.name} key={index}>{a.name}</option>
                        )
                    }
                </select>
                <Link to="/activities"><button>Create activity</button></Link>
            </div>
        </div>
    );
};