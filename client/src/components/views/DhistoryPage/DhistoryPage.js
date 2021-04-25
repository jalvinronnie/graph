import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
function DhistoryPage() {
    return (
        
            <div style={{ width: '80%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Order History</h1>
                </div>
                <br />
    
                <table>
                    <thead>
                        <tr>
                            <th>Purchaser (email)</th>
                            
                            <th>Price</th>
                        </tr>

                        
                    </thead>
    
                   
                </table>
                <br/>
                <br/>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '20%' }}>
                   Withdraw
                        </Button>
            </div>
        )
    
}

export default DhistoryPage
