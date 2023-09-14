import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UpdateData.css';

const UpdateData = () => {
    const [showModal, setShowModal] = useState(false);
    const [resources, setResources] = useState([]);
    // const resources = [{
    //     type: "whnd",
    //     name: "iehf",
    //     quantity: 94,
    //     unit: 34
    // }, {
    //     type: "whnd",
    //     name: "iehf",
    //     quantity: 94,
    //     unit: 34
    // },
    // {
    //     type: "whnd",
    //     name: "iehf",
    //     quantity: 94,
    //     unit: 34
    // },
    // {
    //     type: "whnd",
    //     name: "iehf",
    //     quantity: 94,
    //     unit: 34
    // }]

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api'); // Replace with your API endpoint
                 setResources(response.data);
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
                                    <button className="danger" onClick={openModal}>
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
                                                <input id="type" class="input_field" type="text" name="type" title="Inpit title" placeholder="Enter type of resource" />
                                            </div>
                                            <div class="input_container">
                                                <label for="name" class="input_label">Name</label>
                                                <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter name of your resource" />
                                            </div>
                                            <div class="input_container">
                                                <label for="password_field" class="input_label">Quantity</label>
                                                <input id="quantity" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Quantity" />
                                            </div>
                                            <div class="input_container">
                                                <label for="password_field" class="input_label">Units</label>
                                                <input id="password_field" class="input_field" type="text" name="input-name" title="Inpit title" placeholder="Enter units" />
                                            </div>

                                        </div>
                                        <button className="purchase--btn">Update</button>
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
