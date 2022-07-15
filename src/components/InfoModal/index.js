import React,{useState} from 'react';

import  './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button,Form } from "react-bootstrap";
import axios from 'axios'

export default function InfoModal(props) {
 let url = "https://3000-xunne899-tgc18project2e-czew5zhzmwi.ws-us54.gitpod.io/"
  const {selectedData, isViewVisible,setIsViewVisible } = props
  
  const [name,setName] = useState('');
  const handleNameChange = (e)=>{
     setName(e.target.value);
  }

  const [comment,setComment] = useState('');
  const handleCommentChange = (e)=>{
    setComment(e.target.value);
  }


  const handlePostComment = async () => {


    await axios.post(url + `soap_listings/${selectedData._id}`, {
      comments:{
        //  "_id" : new ObjectId(),
        //  "datePosted" : new Date(),
        "username": selectedData.name,
      "comment": selectedData.comment
    }
    })

     props.goTo("collection");
    // console.log("Username ", name);
    // console.log("Comment ", comment);
    
  }



  console.log('props data=>', props)
  const getPostedTime = (datePosted) =>{
    let timeDiff = (new Date()) - (new Date(datePosted));
    let output = "";
    let days = timeDiff/86400000;
    if(days < 1){
      let hours = timeDiff/3600000;
      if(hours < 1){
        let minute = timeDiff/60000;
        if(minute < 1){
          output = "Just Posted";
        }
        else{
          output = minute.toFixed(0) + " minute(s)";
        }
      }
      else{
        output = hours.toFixed(0) + " hour(s)";
      }
      
    }
    else{
      output = days.toFixed(0) + " day(s)";
    }
    return output;
  }

  const getCommentData = (comments) =>{
    if(comments == undefined){
      return;
    }

    return comments.map(commentInfo => 
      <React.Fragment key={commentInfo._id}>
        <div className="infoLabel">Name:<span>{commentInfo.username}</span></div>
        <div className="infoLabel">Description:<span>{commentInfo.comment}</span></div>
        <div className="infoLabel">Date:<span>{getPostedTime(commentInfo.datePosted)}</span></div>
      </React.Fragment>)
  }

  if(selectedData == undefined && selectedData.cost){
    return;
  }
  return (
    <Modal show={isViewVisible} onHide={setIsViewVisible}>
           <Modal.Header  style={{background:"#ebd8b8"}} closeButton>
          <Modal.Title>View</Modal.Title>
       </Modal.Header>
        <Modal.Body style={{background:"#ebd8b8"}}>
        <div className="infoTitle">{selectedData.soap_label}</div>
          <div className="infoPrice">${selectedData.cost}</div>
          <div className="infoWrapper">
          <div className="infoImage" ><img src={selectedData.image_url} /></div>
          
          <div className="infoLabel">Name:<span>{}</span></div>
          <div className="infoLabel">Comments:</div>
          {
            getCommentData(selectedData.comments)
          }
          </div>
          
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Username</Form.Label>
             <Form.Control
                type="user"
                placeholder="user"
                onChange={handleNameChange}
                value={name}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={handleCommentChange}
                value={comment}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{background:"#ebd8b8"}}>
          <Button variant="primary" onClick={handlePostComment}>
            Post Comment
         </Button>
        </Modal.Footer>
    </Modal>
  )
  
}
