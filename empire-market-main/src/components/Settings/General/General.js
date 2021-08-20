import React, { useEffect, useState } from 'react'
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../images/profile.png'
import { editProfileRequest, setProfilePic } from '../../../redux/ActionCreators';
import web3 from '../../../web3';


function General(){
    const [circleimg, setCircleImg] = useState('');
    const authedUser = useSelector(state => state.authedUser);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [bio, setBio] = useState();
    
    const dispatch = useDispatch();

    useEffect(() => {
        setName(authedUser.authedUser.username);
        setEmail(authedUser.authedUser.email);
        setBio(authedUser.authedUser.bio);
    }, [authedUser.authedUser]);

    const onChangeprofile = (e) => {
        console.log(e);
        setCircleImg(e.target.files[0])
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        console.log(circleimg, name, email, bio);
        if (!(name && email && bio)){
            alert('Please fill all the fields before saving');
        }
        else{
            let signature;
            if (circleimg){
                try{
                signature = await web3.eth.personal.sign(
                    `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                    authedUser.authedUser.address,
                    '' // MetaMask will ignore the password argument here
                );
                    dispatch(setProfilePic(circleimg, authedUser.authedUser.address, signature, name, email, bio))
                    .then(res => setCircleImg(''));

                }
                catch{
                    alert('You need to sign the nonce to verify your identity!');
                }
            }
            else{
                if (name === authedUser.authedUser.username && bio === authedUser.authedUser.bio && email === authedUser.authedUser.email){
                    alert('Nothing to SAVE');
                }
                else{
                    try{
                        signature = await web3.eth.personal.sign(
                            `I am signing my one-time nonce: ${authedUser.authedUser.nonce}`,
                            authedUser.authedUser.address,
                            '' // MetaMask will ignore the password argument here
                        );
                        dispatch(editProfileRequest(name, email, bio, authedUser.authedUser.address, signature));
                    }
                    catch{
                        alert('You need to sign the nonce to verify your identity!');
                    }
                }
            }
        }
    }

    return(
        <div className="ml-4 ml-md-0 mt-4 mt-md-0">
            <div className="mt-2 mb-4">
                <p className="h1 text-white"  id="general-settings">General Settings</p>
            </div>
            <div>
                <p className="h4 text-white mb-2"  id="logo-image-font">Profile Picture</p>
                <p className="text-white" id="logo-image-description-font">Upload new profile picture</p>
                <div>
                    {circleimg ? 
                        (
                        <div onClick={() => document.getElementById('prof-upload').click()} style={{cursor:'pointer'}}>
                            <img alt="..." src={URL.createObjectURL(circleimg)} id="image-general-circle"></img>
                        </div>
                    ): <div onClick={() => document.getElementById('prof-upload').click()} id="image-general-circle" className="mt-4" style={{cursor:'pointer'}}>
                            {authedUser.authedUser.profilepic ? (
                                <img alt="..." src={`${process.env.REACT_APP_BASE_URL}/${authedUser.authedUser.profilepic}`} id="image-general-circle"/>
                            ) : (
                                <img alt="..." src={profile} id="profile-image"></img>
                            )}
                        </div>
                    }
                </div>
                <input type="file" id="prof-upload" accept="image/*" style={{display: 'none'}} onChange={onChangeprofile} />
            </div>

            <div className="mt-5 mr-5">
                <div className="form-group">
                    <label htmlFor="exampleInputText" className="h5 text-white general-label mb-3">User Name</label>
                    <input type="text" className="form-control general-form text-white pl-3 py-2" value={name} onChange={(e) => setName(e.target.value)} id="exampleInputText" placeholder="Enter your username"></input>
                </div>
                <div className="form-group mt-5">
                    <label htmlFor="exampleInputEmail1" className="h5 text-white general-label mb-3">Email</label>
                    <input type="email" className="form-control general-form text-white pl-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" placeholder="Enter your email"></input>
                </div>
                <div className="form-group mt-5">
                    <label htmlFor="Textarea1" className="h5 text-white general-label mb-3">Bio</label>
                    <textarea className="form-control general-form text-white pl-3 py-2" id="Textarea1" value={bio} onChange={(e) => setBio(e.target.value)} rows="5" placeholder="Let the world know about you"></textarea>
                </div>
                <button onClick={(e) => saveProfile(e)}>Save</button>
            </div>
        </div>
    )
}
export default General