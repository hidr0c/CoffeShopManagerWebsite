import { MoneyCollectOutlined } from '@ant-design/icons';
import styles from './page.module.css';

function renderCard({ name, stats, icon, color }: { name: string, stats: string, icon: React.ReactNode, color?: string }) {
    return (
        <div className={styles.card} style={{ color }}>
            <div className={styles.cardTop}>
                <div className={styles.cardStats}>{stats}</div>
                {icon}
            </div>
            <div className={styles.cardName}>{name}</div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <>
            <h1 className={styles.title}>Dashboard</h1>
            <div className={styles.sectionOne}>
                <div className={styles.cardContainer}>
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined />, color: '#8E7468' })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                </div>
                <div className={styles.cardContainer}>
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                    {renderCard({ name: 'Nhà cung cấp', stats: '25', icon: <MoneyCollectOutlined /> })}
                </div>
            </div>
        </>
    );
}