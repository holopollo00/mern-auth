import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, ImageList, ImageListItem, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import "../Customize/Customize.css";
export default function Customizes() {
    const [bedRoom, setBedRoom] = useState(1);
    const [materials, setMaterials] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMaterials();
        fetchSizes();
    }, [selectedSize]);

    const fetchMaterials = async () => {
        try {
            const res = await fetch('/api/material');

            if (!res.ok) {
                throw new Error("Network response was not Ok!");
            }
            const jsonData = await res.json();
            setMaterials(jsonData);
        } catch (error) {
            setError(error);
        }
    };

    const fetchSizes = async () => {
        try {
            const res = await fetch('/api/size');

            if (!res.ok) {
                throw new Error("Network response was not Ok!");
            }
            const jsonData = await res.json();
            setSizes(jsonData);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="" id="Customize">
            <div className="flex justify-center my-11 text-5xl font-semibold">
                <h1>Customizes</h1>
            </div>
            <div className="container">
                <div className="">
                    <h3 className="header">Structure</h3>
                    <div className="item">
                        <div>
                            <h5>Size</h5>
                            {
                                sizes &&
                                sizes?.map((size, index) => {
                                    if(!selectedSize) {
                                        setSelectedSize(sizes[0]);
                                    }

                                    return (
                                        <div className="form-check form-check-inline radio" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id={`inlineRadio${index + 1}`} // Unique IDs for radios
                                                value={size} // Use size ID as value
                                                onChange={(event) => setSelectedSize(event.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor={`inlineRadio${index + 1}`}>
                                                Square: W{size?.wide} x L{size?.long}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>Floor</h5>
                        <div className="form-check form-check-inline radio">
                            <input className="form-check-input" type="radio" name="floorRadioOptions" id="floorRadio1" value="option1" defaultChecked></input>
                            <label className="form-check-label" htmlFor="inlineRadio1">One Floor</label>
                        </div>
                        <div className="form-check form-check-inline radio">
                            <input className="form-check-input" type="radio" name="floorRadioOptions" id="floorRadio2" value="option2"></input>
                            <label className="form-check-label" htmlFor="inlineRadio2">Two Floor</label>
                        </div>
                        <div className="form-check form-check-inline radio">
                            <input className="form-check-input" type="radio" name="floorRadioOptions" id="floorRadio3" value="option3"></input>
                            <label className="form-check-label" htmlFor="inlineRadio3">Three Floor</label>
                        </div>
                        <div className="form-check form-check-inline radio">
                            <input className="form-check-input" type="radio" name="floorRadioOptions" id="floorRadio3" value="option3"></input>
                            <label className="form-check-label" htmlFor="inlineRadio3">Four Floor</label>
                        </div>
                    </div>
                    <div className="item">
                        <h5>Room</h5>
                        <FormControl sx={{ m: 1, minWidth: 140, marginRight: 12 }}>
                            <InputLabel id="demo-simple-select-label">Bed Room</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bedRoom}
                                label="Bed Room"
                                onChange={() => { setBedRoom(bedRoom) }}
                            >
                                <MenuItem value={1} onChange={() => { setBedRoom(value) }}>One Room</MenuItem>
                                <MenuItem value={2} onChange={() => { setBedRoom(value) }}>Two Room</MenuItem>
                                <MenuItem value={3} onChange={() => { setBedRoom(value) }}>Three Room</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 140 }}>
                            <InputLabel id="demo-simple-select-label">Rest Room</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bedRoom}
                                label="Bed Room"
                                onChange={() => { setBedRoom(bedRoom) }}
                            >
                                <MenuItem value={1} onChange={() => { setBedRoom(value) }}>One Room</MenuItem>
                                <MenuItem value={2} onChange={() => { setBedRoom(value) }}>Two Room</MenuItem>
                                <MenuItem value={3} onChange={() => { setBedRoom(value) }}>Three Room</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <h3 className="header">Material</h3>
                    <div className="item">
                        <h5>Paint Wall</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "PaintWall")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>Roof</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "Roof")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>Door</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "Door")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>Window</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "Window")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>WallTile</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "WallTile")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="item">
                        <h5>FloorTile</h5>
                        <div className="material">
                            {
                                materials && materials.filter((item) => item.item === "FloorTile")?.map((item, key) => {
                                    return (
                                        <div className="material-item">
                                            <img key={key} src={item.image} alt="" />
                                            <p>{item.label}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="btn-submit">
                        <Button variant="contained" color="success">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
