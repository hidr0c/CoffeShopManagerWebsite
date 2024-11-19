import Image from "next/image";
import styles from "@/page.module.scss";
import { Card } from "@ui/card/card";
import { Table, TableCell, TableHead, TableRow, TableBody } from "@components/ui/table/table";
import { formatCurrency } from "@/helper/format";

export default function Dashboard() {
  const data = [
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    },
    {
      id: 'VN01',
      name: 'Hat',
      quant: 144,
      purchase: 300000,
      sell: 450000,
    }
  ]

  return (

    <div className={styles.container}>
      <h1 className="title">TRANG CHỦ</h1>
      <div className={styles.statistic}>
        <Card number="25" textColor="#8E7468" label="Tổng số phiếu nhập" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="50+" textColor="#365CA0" label="Tổng loại hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="2287" textColor="#539F8F" label="Tổng số hàng tồn" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="+10" textColor="#E27F6A" label="Nhà cung cấp" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="+13" textColor="#C94752" label="Số lượng mua hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="1,000đ" textColor="#365CA0" label="Doanh thu mua hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="50" textColor="#7F4783" label="Số lượng bán hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />
        <Card number="1,000đ" textColor="#C94752" label="Doanh thu bán hàng" icon={<Image src={'/images/request_quote.png'} width={15} height={20} alt="Request quote" />} />

      </div>
      <div className="">
        <h1 className="title">SỐ LƯỢNG HÀNG TỒN CÒN ÍT</h1>
        <Table style={{ width: '100%', marginTop: '2em' }}>
          <TableHead style={{ background: '#E5E6FA' }}>
            <TableRow>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Tên sản phẩm</TableCell>
              <TableCell sort={true} style={{ padding: '1em 1em 1em 2em' }}>Mã sản phẩm</TableCell>
              <TableCell sort={true} style={{ padding: '1em 1em 1em 2em' }}>Số lượng tồn</TableCell>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Giá mua</TableCell>
              <TableCell style={{ padding: '1em 1em 1em 2em' }}>Giá bán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.name}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.id}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{item.quant}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{formatCurrency(item.purchase)}</TableCell>
                <TableCell style={{ padding: '1em 1em 1em 2em' }}>{formatCurrency(item.sell)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
