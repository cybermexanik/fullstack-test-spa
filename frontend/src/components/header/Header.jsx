import React from 'react';
import './header.css'
import UserImg from '../../assets/icons/user_profile.svg'
import WaveImg from '../../assets/icons/sound_wave.svg'
import WorldImg from '../../assets/icons/world_location.svg'
import SearchImg from '../../assets/icons/search_icon.svg'


const Header = () => {
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='search-bar'>
                    <form className="search-container">
                        <div className="search-wrapper">
                            <input
                                className="search-input"
                                type='text'
                                id="search"
                                placeholder="Поиск..."
                            />
                            <img
                                src={SearchImg}
                                alt="Search"
                                className="search-icon"
                            />
                        </div>
                    </form>
                </div>
                <div className='header-nav'>
                    <ul className='menu-items'>
                        <li className='wave-icon'>
                            <img
                                src={WaveImg}
                                alt='Wave'
                            />
                        </li>
                        <li className='world-icon'>
                            <img
                                src={WorldImg}
                                alt='World'
                            />
                        </li>
                        <li className='user-icon'>
                            <img
                                src={UserImg}
                                alt='User'
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;