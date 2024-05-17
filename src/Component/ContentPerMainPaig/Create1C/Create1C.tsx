import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import TaskName from '../PodComponent/TaskName'
import UserName from '../PodComponent/UserName'
import UserEmail from '../PodComponent/UserEmail'
import TaskOrganization from '../PodComponent/TaskOrganization'
import TaskInfluence from '../PodComponent/TaskInfluence'
import TaskUrgency from '../PodComponent/TaskUrgency'

import '../Create1C/Create1C.css'
import RightContent from '../RightContent/RightContent'
import TaskComment from '../PodComponent/TaskComment'
import { Context } from '../../..'
import AuthService from '../../../services/AuthService'
import { TaskFunction } from '../Interface/TaskFunction'
import UserService from '../../../services/UserService'
import UserNameCreate1c from '../PodComponent/CreateAccount1c/UserNameCreate1c'
import UserCompanyCreate1c from '../PodComponent/CreateAccount1c/UserCompanyCreate1c'
import UserEmailCreate1c from '../PodComponent/CreateAccount1c/UserEmailCreate1c'
import UserJobtitelCreate1c from '../PodComponent/CreateAccount1c/UserJobtitelCreate1c'

const Create1C:FC= () => {
    const [taskService, setTaskService] = useState('')

    const [taskName, setTaskName] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [taskOrganization, setTaskOrganization] = useState('')
    const [taskInfluence, setTaskInfluence] = useState('')
    const [taskInfluenceDescr, setTaskInfluenceDescr] = useState('')
    const [taskUrgency, setTaskUrgency] = useState('')
    const [taskUrgencyDescr, setTaskUrgencyDescr] = useState('')
    const [taskComment, setTaskComment] = useState('')

    const [userNameCreate1c, setUserNameCreate1c] = useState('')
    const [userCompanyCreate1c, setUserCompanyCreate1c] = useState('')
    const [userEmailCreate1c, setUserEmailCreate1c] = useState('')
    const [userJobtitelCreate1c, setUserJobtitelCreate1c] = useState('')

    const { store } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            try {
                store.setLoading(true)
                await store.checkAuth()
            } catch (e) {
                alert(e)
            } finally {
                store.setLoading(false)
            }
        }

        fetchData()
    }, [])
    
    useEffect(() => {
        if (store.isAuth) {
            try {
                setUserName(String(localStorage.getItem('UserName')))
                setUserEmail(String(localStorage.getItem('userEmail')))
                setTaskOrganization(String(localStorage.getItem('company')))
            } catch (e) {
                alert(e)                
            }
        }
    }, [store.isAuth])

    
    const handleSetTaskName = (newState: string) => {
        setTaskName(newState)
    }

    const handleSetUserName = (newState: string) => {
        setUserName(newState)
    }

    const handleSetUserEmail = (newState: string) => {
        setUserEmail(newState)
    }

    const handleSetTaskOrganization = (newState: string) => {
        setTaskOrganization(newState)
    }

    const handleSetTaskInfluence = (newState: string) => {
        setTaskInfluence(newState)
    }

    const handleSetTaskInfluenceDescr = (newState: string) => {
        setTaskInfluenceDescr(newState)
    }

    const handleSetTaskUrgency = (newState: string) => {
        setTaskUrgency(newState)
    }

    const handleSetTaskUrgencyDescr = (newState: string) => {
        setTaskUrgencyDescr(newState)
    }

    const handleSetTaskComment = (newState: string) => {
        setTaskComment(newState)
    }



    const handleSetUserNameCreate1c = (newState: string) => {
        setUserNameCreate1c(newState)
    }

    const handleSetUserCompanyCreate1c = (newState: string) => {
        setUserCompanyCreate1c(newState)
    }

    const handleSetUserEmailCreate1c = (newState: string) => {
        setUserEmailCreate1c(newState)
    }

    const handleSetUserJobtitelCreate1c = (newState: string) => {
        setUserJobtitelCreate1c(newState)
    }
 
    const InterfaceObj = {
        changeTaskName: handleSetTaskName,
        changeUserName: handleSetUserName,
        changeUserEmail: handleSetUserEmail,
        changeTaskOrganization: handleSetTaskOrganization,
        changeTaskInfluence: handleSetTaskInfluence,
        changeTaskInfluenceDescr: handleSetTaskInfluenceDescr,
        changeTaskUrgency: handleSetTaskUrgency,
        changeTaskUrgencyDescr: handleSetTaskUrgencyDescr,
        changeTaskComment: handleSetTaskComment,
        taskName: taskName,
        userName: userName,
        userEmail: userEmail,
        taskOrganization: taskOrganization,
        taskInfluence: taskInfluence,
        taskInfluenceDescr: taskInfluenceDescr,
        taskUrgency: taskUrgency,
        taskUrgencyDescr: taskUrgencyDescr,
        taskComment: taskComment
    }

    const InterfaceObjCreate1c = {
        changeUserNameCreate1c: handleSetUserNameCreate1c,
        changeUserCompanyCreate1c: handleSetUserCompanyCreate1c,
        changeUserEmailCreate1c: handleSetUserEmailCreate1c,
        changeUserJobtitelCreate1c: handleSetUserJobtitelCreate1c,
        userName: userNameCreate1c,
        userCompany: userCompanyCreate1c,
        userEmail: userEmailCreate1c,
        userJobtitel: userJobtitelCreate1c
    }

    async function setNewTask() {
        if (
            !taskService.trim()        ||
            !userName.trim()           ||
            !userEmail.trim()          ||
            !taskOrganization.trim()   ||
            !taskName.trim()           ||            
            !taskInfluence.trim()      ||
            !taskInfluenceDescr.trim() ||
            !taskUrgency.trim()        ||
            !taskUrgencyDescr.trim()   ||
            !taskComment.trim()
        ) {
            alert('Заполните все поля!')
            return
        }      

        let taskObj = [
            {
                ТипЗадачи             : "Задачи 1С",
                ПодтипЗадачи          : taskService,
                Наименование          : taskName,
                ИмяПользователя       : userName,
                email                 : userEmail,
                КомпанияЗаказчик      : taskOrganization,
                ВлияниеЗадачи         : taskInfluence,
                ВлияниеЗадачиПодробно : taskInfluenceDescr,
                Срочность             : taskUrgency,
                СрочностьПодробно     : taskUrgencyDescr,
                Описание              : taskComment
            }
        ]

        console.log(taskObj);

        try {
            store.setLoading(true)

            const res = AuthService.setNewTask(taskObj, String(localStorage.getItem('userEmail')))

            console.log(res);
        } catch (e) {
            console.log(e);
        } finally {
            store.setLoading(false)
        }

        alert("Задача создана!")

        setTaskService("")

        handleSetTaskComment("")
        handleSetTaskInfluence("")
        handleSetTaskInfluenceDescr("")
        handleSetTaskName("")
        handleSetTaskOrganization("")
        handleSetTaskUrgency("")
        handleSetTaskUrgencyDescr("")
        handleSetUserEmail("")
        handleSetUserName("")
    }

    if (store.isLoading) {
        return (
            <Container>
                ...Загрузка
            </Container>
        )
    }

    return (
        <>
            <Container className='VR_Container_Header'>
                <Container className='VR_Container_Title'>
                    <h1>Задача 1С</h1>
                </Container>            
                    <Form className='VR_Container_Flex_Form'>
                        <Form.Group className="mb-3" controlId="ControlSelect1">
                            <Form.Label>Выберите вашу задачу:</Form.Label>
                            <Form.Select 
                                className='VR_TaskName' 
                                aria-label="Ваша задача:"
                                value={taskService}
                                onChange={(e) => setTaskService(e.target.value)}>
                                
                                <option></option>
                                <option value="Доработка 1С">Доработка 1С</option>
                                <option value="Разработка 1С">Разработка 1С</option>
                                <option value="Создание учетной записи АА6">Создание учетной записи АА6</option>
                            </Form.Select>
                        </Form.Group>     

                        <TaskName InterfaceObj={InterfaceObj} />
                        
                        {store.isAuth ? (
                            null
                        ) : (
                            <>
                                <UserName InterfaceObj={InterfaceObj} />
                                <UserEmail InterfaceObj={InterfaceObj} /> 
                                <TaskOrganization InterfaceObj={InterfaceObj} />
                            </>
                        )}
                        <TaskInfluence InterfaceObj={InterfaceObj} />   
                        <TaskUrgency InterfaceObj={InterfaceObj} />

                        {taskService == 'Создание учетной записи АА6' ? (
                            <>
                                <UserNameCreate1c InterfaceObj={InterfaceObjCreate1c} />
                                <UserCompanyCreate1c InterfaceObj={InterfaceObjCreate1c}/>  
                                <UserEmailCreate1c InterfaceObj={InterfaceObjCreate1c} />
                                <UserJobtitelCreate1c InterfaceObj={InterfaceObjCreate1c} />                        
                            </>
                        ) : (
                            null
                        )}


                        <TaskComment InterfaceObj={InterfaceObj}/>
                        
                        <Button onClick={() => {
                            setNewTask()
                        }} className='mb-5 mt-3 ps-5 pe-5' variant="outline-dark">Создать</Button>      
                    </Form>

            </Container> 
        </>
    )
}

export default observer(Create1C)