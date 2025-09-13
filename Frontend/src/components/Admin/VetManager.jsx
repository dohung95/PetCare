import React, { useEffect, useState } from "react";
import api from "../../api";
import { Modal, Button, Table, Form, Badge } from "react-bootstrap";
import "../Css/VetManager.css";
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";


export default function AdminVetList() {
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [show, setShow] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const res = await api.get("/veterinarians", { params: { q, limit: 50 } });
            setItems(res.data?.data || []);
        } catch (e) {
            console.error("Load vets error", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);

    async function openDetail(id) {
        try {
            const res = await api.get(`/veterinarians/${id}`);
            setSelected(res.data?.data || null);
            setShow(true);
        } catch (e) {
            console.error("Get detail error", e);
        }
    }

    async function reject(id) {
        if (!window.confirm("Reject/Remove this registration?")) return;
        try {
            await api.delete(`/veterinarians/${id}`);
            setItems(prev => prev.filter(v => v._id !== id));
            if (selected?._id === id) setShow(false);
        } catch (e) {
            console.error("Delete error", e);
        }
    }

    return (
        <div className="container-fluid p-0">
            <Row className="g-0">
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10} className="p-4">
                    <div className="vetadm-card">
                        <div className="vetadm-header">
                            <h4 className="m-0">🩺 Veterinarian Registrations</h4>
                            <div className="vetadm-tools">
                                <Form.Control
                                    size="sm"
                                    placeholder="Search name/email/phone…"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    className="vetadm-input"
                                />
                                <Button size="sm" variant="primary" onClick={load} disabled={loading}>
                                    {loading ? "Loading..." : "Reload"}
                                </Button>
                            </div>
                        </div>

                        <div className="vetadm-body">
                            <Table striped hover responsive className="mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap' }}>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Specialization</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Experience</th>
                                        <th style={{ width: 160 }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(v => (
                                        <tr key={v._id}>
                                            <td>{v.name}</td>
                                            <td>{v.email}</td>
                                            <td>{v.phone}</td>
                                            <td>{v.specialization || "-"}</td>
                                            <td>{v.experience ?? "-"}</td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button size="sm" variant="info" onClick={() => openDetail(v._id)}>
                                                        View
                                                    </Button>
                                                    <Button size="sm" variant="secondary" onClick={() => reject(v._id)}>
                                                        Reject
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center text-muted py-4">
                                                No data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <Modal show={show} onHide={() => setShow(false)} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Veterinarian Detail</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!selected ? (
                                    <div>Loading…</div>
                                ) : (
                                    <div className="vetadm-detail">
                                        <div><strong>Name:</strong> {selected.name}</div>
                                        <div><strong>Email:</strong> {selected.email}</div>
                                        <div><strong>Phone:</strong> {selected.phone}</div>
                                        <div><strong>Address:</strong> {selected.address || "-"}</div>
                                        <div><strong>Specialization:</strong> {selected.specialization || "-"}</div>
                                        <div><strong>Experience:</strong> {selected.experience ?? "-"}</div>
                                        <div className="mt-2">
                                            <strong>Available slots:</strong>
                                            <div className="vetadm-chips mt-1">
                                                {(selected.available_slots || []).length
                                                    ? selected.available_slots.map(s => <span key={s} className="vetadm-chip">{s}</span>)
                                                    : <span className="text-muted">No slots</span>
                                                }
                                            </div>
                                        </div>

                                        {/* Nút bạn sẽ thêm sau để làm hành động khác */}
                                        {/* <Button className="mt-3" variant="outline-primary">Your next action</Button> */}
                                    </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                {selected && (
                                    <Button variant="secondary" onClick={() => reject(selected._id)}>
                                        Reject
                                    </Button>
                                )}
                                <Button variant="outline-dark" onClick={() => setShow(false)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
