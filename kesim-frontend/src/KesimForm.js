import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KesimForm = () => {
    const [kesimVerileri, setKesimVerileri] = useState([]);
    const [formData, setFormData] = useState({
        x_kesim: '',
        x_adet: '',
        y_kesim: '',
        y_adet: '',
        z_kesim: '',
        z_adet: '',
        w_kesim: '',
        w_adet: '',
        barkod: '',
    });

    useEffect(() => {
        axios.get('/api/kesim-verileri/')
            .then(response => {
                setKesimVerileri(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/kesim-verileri/', formData)
            .then(response => {
                setKesimVerileri([...kesimVerileri, response.data]);
                setFormData({
                    x_kesim: '',
                    x_adet: '',
                    y_kesim: '',
                    y_adet: '',
                    z_kesim: '',
                    z_adet: '',
                    w_kesim: '',
                    w_adet: '',
                    barkod: '',
                });
            })
            .catch(error => {
                console.error("There was an error submitting the data!", error);
            });
    };

    const downloadPDF = () => {
        axios.get('/api/download-pdf/', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'kesim_raporu.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error("There was an error downloading the PDF!", error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="x_kesim" value={formData.x_kesim} onChange={handleChange} placeholder="X Kesim" />
                <input name="x_adet" value={formData.x_adet} onChange={handleChange} placeholder="X Adet" />
                <input name="y_kesim" value={formData.y_kesim} onChange={handleChange} placeholder="Y Kesim" />
                <input name="y_adet" value={formData.y_adet} onChange={handleChange} placeholder="Y Adet" />
                <input name="z_kesim" value={formData.z_kesim} onChange={handleChange} placeholder="Z Kesim" />
                <input name="z_adet" value={formData.z_adet} onChange={handleChange} placeholder="Z Adet" />
                <input name="w_kesim" value={formData.w_kesim} onChange={handleChange} placeholder="W Kesim" />
                <input name="w_adet" value={formData.w_adet} onChange={handleChange} placeholder="W Adet" />
                <input name="barkod" value={formData.barkod} onChange={handleChange} placeholder="Barkod" />
                <button type="submit">Veriyi Ekle</button>
            </form>

            <button onClick={downloadPDF}>PDF İndir</button>

            <ul>
                {kesimVerileri.map((veri, index) => (
                    <li key={index}>
                        Barkod: {veri.barkod}, X Kesim: {veri.x_kesim}, X Adet: {veri.x_adet}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KesimForm;
