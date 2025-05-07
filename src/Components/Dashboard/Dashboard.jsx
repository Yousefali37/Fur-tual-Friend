import { Outlet } from 'react-router-dom';
import './CSS/Dashboard.css';
import Header from './../Header/Header';

function Dashboard() {
    return (
        <div className="Dash-container text-center p-5 d-flex flex-column">
            <Header page={'dashboard'} />
            <div className='gap-2 row justify-content-start align-items-center mt-3'>
                <div className='content flex-column align-items-center text-center'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;