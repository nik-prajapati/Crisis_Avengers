import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UpdateData.css';

const UpdateData = () => {
    const [showModal, setShowModal] = useState(false);
    const [idx, newidx] = useState(-1);
    const [resources, setResources] = useState([
    ]);
    const [selectedResource, setSelectedResource] = useState({
        name:"",
        type:"",
        quantity:0,
        unit:0
    }); // State to store the selected resource

    const openModal = (index) => {
        setShowModal(true);
        newidx(index); 
    };

    const closeModal = () => {
        setShowModal(false);
    };
  
      const handleUpdate=(event)=>{
        event.preventDefault();
        console.log(idx);
        if (idx !== -1) {
            const updatedResources = [...resources];
            updatedResources[idx] = selectedResource;
            setResources(updatedResources);
        }
        const updatedResourceData = {
            type: selectedResource.type,
            name: selectedResource.name,
            quantity: selectedResource.quantity,
            unit: selectedResource.unit,
        };
        console.log(updatedResourceData);
        const response =axios.post('/api/updateResource', updatedResourceData)
        try {
            const response = await axios.post('/api/updateResource', updatedResourceData);
            console.log('Resource updated successfully', response.data);
        } catch (error) {
            console.error('Error updating resource:', error);
        }
          
    }
        console.log(selectedResource);
        console.log(resources)
     }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api'); 
                //  setResources(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="table-container">
                <table className="rwd-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map((resource, index) => (
                            <tr key={index}>
                                <td data-th="Type">{resource.type}</td>
                                <td data-th="Name">{resource.name}</td>
                                <td data-th="Quantity">{resource.quantity}</td>
                                <td data-th="Unit">{resource.unit}</td>
                                <td data-th="Update">
                                    <button className="danger" onClick={()=>openModal(index)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modalcontent">
                        <div className="innermodal">
                            <div className="modalcontent">
                                <div className="innermodal">
                                    <form className="form">
                                        <div className="separator">
                                            <hr className="line" />
                                            <h3>Update details</h3>
                                            <hr className="line" />
                                        </div>
                                        <div className="credit-card-info--form">
                                            <div class="input_container">
                                                <label for="type" class="input_label">Type</label>
                                                <input id="type" class="input_field" type="text" name="type" title="Inpit title" placeholder="Enter type of resource"
                                                value={selectedResource.type}
                                                onChange={(e) => setSelectedResource({ ...selectedResource, type: e.target.value })} />
                                            </div>
                                            <div class="input_container">
                                                <label for="name" class="input_label">Name</label>
                                                <input id="password_field" class="input_field" type="text" name="name" title="Inpit title" placeholder="Enter name of your resource" 
                                                value={selectedResource.name}
                                                onChange={(e) => setSelectedResource({ ...selectedResource, name: e.target.value })}/>
                                            </div>
                                            <div class="input_container">
                                                <label for="password_field" class="input_label">Quantity</label>
                                                <input id="quantity" class="input_field" type="text" name="quantity" title="Inpit title" placeholder="Quantity"
                                                value={selectedResource.quantity}
                                                onChange={(e) => setSelectedResource({ ...selectedResource, quantity: e.target.value })} />
                                            </div>
                                            <div class="input_container">
                                                <label for="password_field" class="input_label">Units</label>
                                                <input id="password_field" class="input_field" type="text" name="unit" title="Inpit title" placeholder="Enter units" 
                                                value={selectedResource.unit}
                                                onChange={(e) => setSelectedResource({ ...selectedResource, unit: e.target.value })}/>
                                            </div>

                                        </div>
                                        <button className="purchase--btn" onClick={handleUpdate} >Update</button>
                                        <button className="purchase--btn" onClick={closeModal} >Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateData;
