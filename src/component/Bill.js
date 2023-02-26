import React, { useState, useEffect } from 'react'

const Bill = () => {
    const [billDetail, setBillDetail] = useState({ num: "", date: "", name: "", type: "", totalAmt: 0, totalQty: 0 });
    const [allBillDetail, setAllBillDetail] = useState([]);
    const [formValues, setFormValues] = useState([{ itemname: "", qty: "", rate: "", amount: 0 }]);
    const [allFormValues, setAllFormValues] = useState([]);



    const handleChange = (e) => {
        setBillDetail({ ...billDetail, [e.target.name]: e.target.value })
    }

    let handleChangec = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        if (newFormValues[i].qty || newFormValues[i].rate) {
            newFormValues[i].amount = newFormValues[i].qty * newFormValues[i].rate
        }
        console.log(newFormValues[i].amount = newFormValues[i].qty * newFormValues[i].rate);
        setFormValues(newFormValues);
    }


    let addFormFields = () => {
        setFormValues([...formValues, { itemname: "", qty: "", rate: "", amount: 0 }])
        // setBillDetail({ num:curvalue.num, date: curvalue.date, name: curvalue.name, type: curvalue.value})
        // console.log(curvalue.name)
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    const calcQty = () => {
        let total = 0;
        formValues.map((bill) => {
            return total += Number(bill.qty)
        });
        // setTotalAmt(total)
        return total;
    }

    const calcAmount = () => {
        let total = 0;
        formValues.map((bill) => {
            return total += (bill.qty * bill.rate)
        })
        return total;

    }

    const submitData = (e, i) => {
        e.preventDefault()
        billDetail.totalQty = calcQty();
        billDetail.totalAmt = calcAmount();
        let bill = [...allBillDetail, billDetail]
        setAllBillDetail(bill);
        console.log(bill);
        localStorage.setItem('allBill', JSON.stringify(bill));
        setBillDetail({ num: "", date: "", name: "", type: "", totalAmt: 0, totalQty: 0 })
        setFormValues([{ itemname: "", qty: "", rate: "", amount: 0 }])


    }
    const deleteItem = (index) => {
        allBillDetail.splice(index, 1);
        localStorage.setItem('allBill', JSON.stringify(allBillDetail));
        setAllBillDetail(JSON.parse(JSON.stringify(allBillDetail)));
    }

    const getData = () => {
        const lsData = JSON.parse(localStorage.getItem('allBill'));
        if (lsData != null) {
            setAllBillDetail(lsData)
            console.log(lsData);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    const newLocal = "form-select";
    return (
        <div className='container'>
            <h1 className='my-2 text-center'>Bill</h1>
            <hr />
            <div className="row">
            <div className="col-6">
                    <form className='p-5'>
                        <div className="mb-3">
                            <label htmlFor="num" className="form-label"><b> Invoice No : </b> </label>
                            <input type="text" className="form-control" id="name" name='num' value={billDetail.num} onChange={handleChange} required />
                        </div>
                        <div className="mb-3 ">
                            <label htmlFor="name" className="form-label"><b> Customer Name : </b></label>
                            <input type="text" className="form-control" id="name" name='name' value={billDetail.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label"><b> Date : </b></label>
                            <input type="date" className="form-control" id="date" name='date' value={billDetail.date} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className='form-label'><b>Payment Type:</b></label>
                            <select className={newLocal} aria-label="Default select example" name='type' value={billDetail.type} onChange={handleChange} required >
                                <option value='' disabled>Select Payment Type</option>
                                <option value="Google pay">Google Pay</option>
                                <option value="Paytm">Paytm </option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div><b>Total Quantity : </b>{calcQty()} <br />
                                <b>Total Amount : </b>{calcAmount()}</div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type='submit' className='btn btn-success' onClick={submitData} > Submit</button>
                        </div>
                    </form>
                </div>


                <div className="col-6">
                    <button className="btn btn-outline-success" onClick={() => addFormFields()}><i className="fa-solid fa-plus"></i></button>

                    {formValues.map((element, index) => (
                            <div className=" my-1 mx-5" key={index}>
                                <b> {index}.  </b>&nbsp;&nbsp; <br />
                                <label className="form-label">Item : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="text" name="itemname" value={element.itemname} onChange={e => handleChangec(index, e)} />&nbsp;&nbsp;&nbsp;&nbsp;<br />
                                <label className="form-label">Quantity :&nbsp; &nbsp;</label>
                                <input type="text" name="qty" value={element.qty} onChange={e => handleChangec(index, e)} />&nbsp;&nbsp;&nbsp;&nbsp;<br />
                                <label className="form-label">Rate : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <input type="text" name="rate" value={element.rate} onChange={e => handleChangec(index, e)} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <label className="form-label">Amount : &nbsp;</label>
                                {(element.amount)}&nbsp;&nbsp;
                                <button type="button" className="btn btn-danger btn-sm " onClick={() => removeFormFields(index)} style={{ borderRadius: "50%" }}><i className="fa-sharp fa-solid fa-minus" ></i></button>
                                <hr />
                            </div>
                    ))}
                </div>

                
            </div>

            <div className="row">
                {allBillDetail.map((data, index) => {
                    return <div className="col-4 my-2" key={index}>
                        <div className="card" >
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">No : {data.num}</h5>
                                    <i className="text-danger fa-solid fa-trash" onClick={() => deleteItem(index)}></i>
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted">Date :
                                    &nbsp;
                                    {data.date}
                                </h6>
                                <hr />
                                <p className="card-text"> <b> Name : </b> {data.name}</p>
                                <p className="card-text"><b> Payment Type : </b>{data.type}</p>

                                <div>
                                    <p> <b>Total Quantity :</b> {data.totalQty} </p>
                                    <p> <b>Total Amount : </b>{data.totalAmt} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Bill