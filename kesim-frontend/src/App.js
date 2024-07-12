import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [veriler, setVeriler] = useState([]);
    const [formData, setFormData] = useState({
        xKesim: '',
        xAdet: '',
        yKesim: '',
        yAdet: '',
        zKesim: '',
        zAdet: '',
        wKesim: '',
        wAdet: '',
        barkod: '',
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/kesim-verileri/')
            .then(response => setVeriler(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/kesim-verileri/', formData)
            .then(response => setVeriler([...veriler, response.data]))
            .catch(error => console.error(error));
    };

    const handleDownload = () => {
        axios.get('http://127.0.0.1:8000/api/download-pdf/', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'kesim_verileri.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Kesim Verileri</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="xKesim" value={formData.xKesim} onChange={handleChange} placeholder="X Kesim" />
                <input type="text" name="xAdet" value={formData.xAdet} onChange={handleChange} placeholder="X Adet" />
                <input type="text" name="yKesim" value={formData.yKesim} onChange={handleChange} placeholder="Y Kesim" />
                <input type="text" name="yAdet" value={formData.yAdet} onChange={handleChange} placeholder="Y Adet" />
                <input type="text" name="zKesim" value={formData.zKesim} onChange={handleChange} placeholder="Z Kesim" />
                <input type="text" name="zAdet" value={formData.zAdet} onChange={handleChange} placeholder="Z Adet" />
                <input type="text" name="wKesim" value={formData.wKesim} onChange={handleChange} placeholder="W Kesim" />
                <input type="text" name="wAdet" value={formData.wAdet} onChange={handleChange} placeholder="W Adet" />
                <input type="text" name="barkod" value={formData.barkod} onChange={handleChange} placeholder="Barkod" />
                <button type="submit">Veriyi Ekle</button>
            </form>
            <button onClick={handleDownload}>PDF İndir</button>
            <ul>
                {veriler.map(veri => (
                    <li key={veri.id}>
                        {veri.xKesim} - {veri.xAdet} - {veri.yKesim} - {veri.yAdet} - {veri.zKesim} - {veri.zAdet} - {veri.wKesim} - {veri.wAdet} - {veri.barkod}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
