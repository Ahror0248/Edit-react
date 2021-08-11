import React, { Component } from 'react'
import './edit.css'

 class Edit extends Component {
     constructor(props) {
         super(props)
         this.state = {
             title: 'a', 
             data: [
                 {id: 1, name: 'John', status:'high', disabled:false, delBtn: false},
                 {id: 2, name: 'Jack', status:'low', disabled:false, delBtn: false},
                 {id: 3, name: 'Dragon', status:'high', disabled:false, delBtn: false},
                 {id: 4, name: 'Batt', status:'medium', disabled:false, delBtn: false}
             ],
             name:'',
             status:'',
             addBtn:false
         }
     } 
    render() {
        const onDelete = (id) => {
          const NewData = this.state.data.filter(value=> value.id !== id)
             this.setState({data: NewData})
        }

        const onEdit = (id) => {
            let data1 = this.state.data
            data1.forEach((item)=> {
                if(item.id!==id) {
                    item.disabled=true
                    item.delBtn=false
                } else {
                    item.disabled=false
                    item.delBtn=true
                }
            })
            let dat = data1.filter((item)=>item.id===id)
            const Name = dat[0].name
            const Status = dat[0].status
            this.setState({name: Name, status: Status, data:data1, addBtn:true})
            
            

        }

        const add = ()=>{
            // console.log('added', this.state.name, this.state.status );
            const data = {name: this.state.name, status: this.state.status, id: this.state.data[this.state.data.length-1].id+1, disabled:false, delBtn:false}
            if(this.state.name !== '' && this.state.status !== ''){
                const newData = [...this.state.data, data]
                this.setState({data: newData, name:'', status:''})
            }
            else {
                alert(`Fill both 'name' and 'status' input`)
            }
        }

        const onSave = (id)=> {
            const Sname = this.state.name 
            const Sstatus = this.state.status 
            if(this.state.name !== '' && this.state.status !== ''){
            let data1 = this.state.data
            let dat = data1.filter((item)=>item.id===id)
            dat[0].name=Sname
            dat[0].status=Sstatus
            data1.forEach((item)=> {
                item.disabled=false
                item.delBtn=false     
            })
            this.setState({
                data:data1,
                name:'',
                status:'',
                addBtn:false
            })              
        }    else {
                alert(`Fill both 'name' and 'status' input`)
            }
            
        }
        const onName = (e) => {
            this.setState({name:e.target.value})
        }
        const onStatus = (e) => {
            this.setState({status:e.target.value})
        }   

        return (
            <div>
                <div className='all-input'>
                    <input value={this.state.name} style={{width: '45%', height:'30px'}} onChange={onName} placeholder="name" type="text" />
                    <input value={this.state.status} style={{width: '45%', height:'30px'}} onChange={onStatus}  placeholder="status" type="text" />
                    <button style={{width:'8.9%', height:'35px'}} disabled={this.state.addBtn} onClick={add}>add</button>

                </div>
                <table className='all' border="1">
                    <tr>
                    <th>ID</th>
                    <th>Name</th>    
                    <th>Status</th>    
                    <th>Action</th>
                    </tr> 
                    {
                    this.state.data.map(({id, name, status, disabled, delBtn})=>{
                        return(
                            <tr>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{status}</td>
                                <td>
                                    <button disabled={delBtn} onClick = {()=> onDelete(id) }>delete {id}</button>
                                </td>
                                <td>
                                    <button onClick = {()=> onEdit(id) }>edit {id}</button>
                                </td>
                                <td>
                                    <button disabled={disabled} onClick = {()=> onSave(id) }>save {id}</button>
                                </td>

                            </tr>
                        )
                    })
                }                   
                </table>        

                
            </div>
        )
    }
}

export default Edit



