import React, { useState } from 'react';
import './App.css';

function App() {
  const [cveRecords, setCveRecords] = useState([
    { id: 1, cveId: 'CVE-2022-1234', severity: 'High', cvss: '8.6', affectedPackages: 'Package A, Package B', cweId: 'CWE-79' },
    { id: 2, cveId: 'CVE-2022-5678', severity: 'Medium', cvss: '5.2', affectedPackages: 'Package C', cweId: 'CWE-89' },
    // Add more demo records as needed
  ]);
  const [filteredRecords, setFilteredRecords] = useState([...cveRecords]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cveId: '',
    severity: '',
    cvss: '',
    affectedPackages: '',
    cweId: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [filterValues, setFilterValues] = useState({
    cveId: '',
    severity: '',
    cvss: '',
    affectedPackages: '',
    cweId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCve = () => {
    if (editIndex !== null) {
      // Edit existing record
      const updatedRecords = [...cveRecords];
      updatedRecords[editIndex] = formData;
      setCveRecords(updatedRecords);
      setFilteredRecords(updatedRecords); // Update filtered records
      setEditIndex(null);
    } else {
      // Add new record
      const newRecord = { ...formData, id: cveRecords.length + 1 };
      setCveRecords([...cveRecords, newRecord]);
      setFilteredRecords([...filteredRecords, newRecord]); // Update filteredRecords with the new record
    }
    setFormData({
      cveId: '',
      severity: '',
      cvss: '',
      affectedPackages: '',
      cweId: ''
    });
    setShowModal(false);
  };

  const handleDeleteCve = (id) => {
    const updatedCveRecords = cveRecords.filter(record => record.id !== id);
    setCveRecords(updatedCveRecords);
    setFilteredRecords(updatedCveRecords); // Update filtered records
    // Update filtered records if necessary
    if (filteredRecords.length !== cveRecords.length) {
      const updatedFilteredRecords = filteredRecords.filter(record => record.id !== id);
      setFilteredRecords(updatedFilteredRecords);
    }
  };

  const handleEditCve = (index) => {
    setEditIndex(index);
    setFormData({ ...cveRecords[index] });
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditIndex(null); // Reset editIndex when closing modal
    setFormData({
      cveId: '',
      severity: '',
      cvss: '',
      affectedPackages: '',
      cweId: ''
    }); // Clear form data
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleFilter = () => {
    let filtered = [...cveRecords];
    for (const key in filterValues) {
      if (filterValues[key]) {
        filtered = filtered.filter(record => record[key].toLowerCase().includes(filterValues[key].toLowerCase()));
      }
    }
    setFilteredRecords(filtered);
  };

  const handleClearFilter = () => {
    setFilteredRecords(cveRecords);
    setFilterValues({
      cveId: '',
      severity: '',
      cvss: '',
      affectedPackages: '',
      cweId: ''
    });
  };

  return (
    <div className="App">
      <h1>CVE DATABASE</h1>
      <div className="filterInputs">
        <input type="text" name="cveId" placeholder="Filter CVE-ID" value={filterValues.cveId} onChange={handleFilterChange} />
        <input type="text" name="severity" placeholder="Filter Severity" value={filterValues.severity} onChange={handleFilterChange} />
        <input type="text" name="cvss" placeholder="Filter CVSS" value={filterValues.cvss} onChange={handleFilterChange} />
        <input type="text" name="affectedPackages" placeholder="Filter Affected Packages" value={filterValues.affectedPackages} onChange={handleFilterChange} />
        <input type="text" name="cweId" placeholder="Filter CWE-ID" value={filterValues.cweId} onChange={handleFilterChange} />
        <button className= "filter"onClick={handleFilter}>Filter</button>
        <button className = "clear-filter"onClick={handleClearFilter}>Clear Filter</button>
      </div>
      <button className = "add-cwe" onClick={handleOpenModal}>Add New CVE</button>
      <table>
        <thead>
          <tr>
            <th>CVE-ID</th>
            <th>Severity</th>
            <th>CVSS</th>
            <th>Affected Packages</th>
            <th>CWE-ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={record.id}>
              <td>{record.cveId}</td>
              <td>{record.severity}</td>
              <td>{record.cvss}</td>
              <td>{record.affectedPackages}</td>
              <td>{record.cweId}</td>
              <td>
                <button className = "edit" onClick={() => handleEditCve(index)}>Edit</button>
                <button className = "delete" onClick={() => handleDeleteCve(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal ">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <input type="text" name="cveId" placeholder="CVE-ID" value={formData.cveId} onChange={handleInputChange} />
            <input type="text" name="severity" placeholder="Severity" value={formData.severity} onChange={handleInputChange} />
            <input type="text" name="cvss" placeholder="CVSS" value={formData.cvss} onChange={handleInputChange} />
            <input type="text" name="affectedPackages" placeholder="Affected Packages" value={formData.affectedPackages} onChange={handleInputChange} />
            <input type="text" name="cweId" placeholder="CWE-ID" value={formData.cweId} onChange={handleInputChange} />
            <button className = "save filterButtons" onClick={handleAddCve}>Save</button>
            <button className = "cancel filterButtons" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
