import React from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import MiniFooter from '../components/MiniFooter';
import { Link } from 'react-router-dom';
import giftIcon from '../assets/Gift.png';
import styles from './RewardsPage.module.css';

const RewardsPage = () => {
  // Mock user data - in a real app, this would come from a context or API
  const userData = {
    username: 'Walex14',
    level: 'Diamond',
    ecoPoints: 3250,
    currentStreak: 15,
    badgesClaimed: 7,
  };

  // Level progress data
  const levels = [
    { name: 'Diamond', icon: '💎', active: true, current: true },
    { name: 'Bronze', icon: '🏆', active: false, current: false },
    { name: 'Silver', icon: '🏆', active: false, current: false },
    { name: 'Gold', icon: '🏆', active: false, current: false },
    { name: 'Platinum', icon: '💎', active: false, current: false },
  ];

  return (
    <div className={styles.rewardsContainer}>
      <DashboardNavbar />

      {/* Green Header Section */}
      <section className={styles.headerSection}>
        <div className={styles.headerContent}>
          <h1 className={`${styles.headerTitle} font-poppins`}>
            Your Eco Rewards
          </h1>
          <p className={`${styles.headerSubtitle} font-poppins`}>
            Earn points. Redeem rewards. Make an impact!
          </p>
        </div>
      </section>

      {/* Main Content with Black Background */}
      <section className={styles.mainSection}>
        <div className={styles.mainContent}>
          {/* User Profile and Points Section */}
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              {/* User Profile */}
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className={styles.userDetails}>
                  <p className={`${styles.username} font-poppins`}>
                    Username: {userData.username}
                  </p>
                  <p className={`${styles.levelLabel} font-poppins`}>Level</p>
                  {/* Level Progress Bar */}
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className={styles.levelIndicator}>
                    <span className={styles.levelIcon}>💎</span>
                    <span>{userData.level}</span>
                  </div>
                </div>
              </div>

              {/* Points Card */}
              <div className={styles.pointsCard}>
                <h2 className={styles.pointsValue}>{userData.ecoPoints}</h2>
                <div className={styles.pointsLabel}>
                  <p className="mr-2 font-poppins">Eco Points Earned</p>
                  <img
                    src={giftIcon}
                    alt="Gift"
                    className={styles.pointsIcon}
                  />
                </div>
              </div>
            </div>

            {/* Level Progress Indicators */}
            <div className={styles.levelsProgress}>
              <div className={styles.progressLine}></div>

              <div className={styles.levelsContainer}>
                {/* Level Icons */}
                {levels.map((level, index) => (
                  <div key={index} className={styles.levelItem}>
                    <div
                      className={`${styles.levelBadge} ${
                        level.current ? styles.levelBadgeCurrent : ''
                      }`}
                    >
                      {level.icon}
                    </div>
                    <p className={`${styles.levelName} font-poppins`}>
                      {level.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              {/* Current Streak Card */}
              <div className={styles.statCard}>
                <div className={styles.statInfo}>
                  <h3 className={`${styles.statValue} font-poppins`}>
                    {userData.currentStreak}
                  </h3>
                  <p className={`${styles.statLabel} font-poppins`}>
                    Current Streak
                  </p>
                </div>
                <div className={styles.statIcon}>🔥</div>
              </div>

              {/* Badges Claimed Card */}
              <div className={styles.statCard}>
                <div className={styles.statInfo}>
                  <h3 className={`${styles.statValue} font-poppins`}>
                    {userData.badgesClaimed}
                  </h3>
                  <p className={`${styles.statLabel} font-poppins`}>
                    Badges Claims
                  </p>
                </div>
                <div className={styles.statIcon}>🏅</div>
              </div>
            </div>
          </div>

          {/* Additional content can be added here */}
        </div>
      </section>

      <MiniFooter />
    </div>
  );
};

export default RewardsPage;
