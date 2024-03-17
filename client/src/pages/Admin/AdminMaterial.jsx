import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import "./AdminMaterial.css";
import { useSelector } from "react-redux";
import axios from "axios";

const filterList = [
    {
        item: "All",
        name: "Tất cả"
    },
    {
        item: "Door",
        name: "Cửa đi"
    },
    {
        item: "PaintWall",
        name: "Sơn hoàn thiện"
    },
    {
        item: "Roof",
        name: "Ngói"
    },
    {
        item: "Window",
        name: "Cửa sổ"
    },
    {
        item: "WallTitle",
        name: "Tường ốp"
    },
    {
        item: "FloorTitle",
        name: "Gạch bông gió"
    }
]

const AdminMaterial = () => {
    const { currentUser } = useSelector((state) => state.user);

    const [selectedMaterial, setSelectedMaterial] = useState(filterList[0]);
    const [materials, setMaterials] = useState([]);
    const [imageLink, setImageLink] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [editingMaterial, setEditingMaterial] = useState(null);


    useEffect(() => {
        fetchData();
    }, [selectedMaterial, editingMaterial]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3000/api/material`);
        const data = res.data;
        if (selectedMaterial != "All") {
            data.filter(e => e.item == selectedMaterial.item);
            setMaterials(data);
        }
        setMaterials(data);
    }

    const handleEdit = (item) => {
        setImageLink(item.image);
        setName(item.name);
        setPrice(item.price);
        setEditingMaterial(item);
    }

    const handleSave = async () => {
        const data = { ...editingMaterial };
        data.image = imageLink;
        data.name = name;
        data.price = price;

        try {
            const response = await axios.put(
                `http://localhost:3000/api/material/${data._id}`,
                data,
                {
                    headers: { token: `Bearer ${currentUser?.accessToken}` },
                });
            console.log('Design save updated successfully:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error updating design save:', error.response.data);
            } else {
                console.error('Error:', error);
            }
        }
        setEditingMaterial(null);
    }

    return (
        <div id='AdminMaterial'>
            <h1>Material Management</h1>
            <div className="container">
                <div className="filter">
                    <Box sx={{ width: "fit-content" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedMaterial}
                                label="Loại vật liệu"
                                onChange={(e) => { setSelectedMaterial(e.target.value) }}
                            >
                                {
                                    filterList.map((item, index) => {
                                        return (
                                            <MenuItem value={item} key={index}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="item-list">
                    <div className="item">
                        <div className="item-header image">
                            Hình ảnh
                        </div>
                        <div className="item-header image-link">Link hình ảnh</div>
                        <div className="item-header type">Loại</div>
                        <div className="item-header name">Tên</div>
                        <div className="item-header price">Giá</div>
                        <div className="item-header handle">Thao tác</div>
                    </div>
                    {
                        materials && materials?.map((item, index) => {
                            return (
                                (item._id == editingMaterial?._id)
                                    ?
                                    (
                                        <div className="item item-cover" key={index}>
                                            <div className="image">
                                                <img src={imageLink} alt="" />
                                            </div>
                                            <div className="image-link"><TextField id="outlined-basic" label="Link" variant="outlined" value={imageLink}
                                                onChange={(e) => {
                                                    setImageLink(e.target.value);
                                                }}
                                            /></div>
                                            <div className="type"><TextField id="outlined-basic" label="Loại" variant="outlined" value={filterList.find(e => e.item === item.item)?.name || ""}
                                            /></div>
                                            <div className="name"><TextField id="outlined-basic" label="Tên" variant="outlined" value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            /></div>
                                            <div className="price"><TextField id="outlined-basic" label="Giá" variant="outlined" value={price}
                                                onChange={(e) => {
                                                    setPrice(e.target.value);
                                                }}
                                            /></div>
                                            <div className="handle">
                                                <Button variant="contained" style={{ backgroundColor: "green" }} onClick={() => { handleSave() }}>Lưu</Button>
                                                <Button variant="contained" style={{ backgroundColor: "red" }} onClick={() => { setEditingMaterial(null) }}>Huỷ</Button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    <div className="item item-cover" key={index}>
                                        <div className="image">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="image-link"><TextField id="outlined-basic" label="Link" variant="outlined" value={item.image}
                                        /></div>
                                        <div className="type"><TextField id="outlined-basic" label="Loại" variant="outlined" value={filterList.find(e => e.item === item.item)?.name || ""}
                                        /></div>
                                        <div className="name"><TextField id="outlined-basic" label="Tên" variant="outlined" value={item.name}
                                        /></div>
                                        <div className="price"><TextField id="outlined-basic" label="Giá" variant="outlined" value={item.price}
                                        /></div>
                                        <div className="handle">
                                            <Button variant="contained" onClick={() => { handleEdit(item) }}>Sửa</Button>
                                            <Button variant="contained" style={{ backgroundColor: "red" }}>Xoá</Button>
                                        </div>
                                    </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminMaterial