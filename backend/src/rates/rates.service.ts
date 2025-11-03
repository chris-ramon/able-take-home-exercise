import { Injectable } from '@nestjs/common';
import finnhub from 'finnhub';
import { EventGateway } from 'src/events/event.gateway';

@Injectable()
export class RatesService {
    constructor(private eventGateway: EventGateway) {

        const socket = new WebSocket('wss://ws.finnhub.io?token='+process.env.FINNHUB_API_KEY);
  
        socket.addEventListener('open', function (event) {
            socket.send(JSON.stringify({'type': 'subscribe', 'symbol': 'COINBASE:BTC-USD'}));
        });
  
        socket.addEventListener('message', function (event) {
            const data = JSON.parse(event.data);

            if(data.type !== 'trade') {
                return;
            }

            eventGateway.clients.forEach(client => {
                client.emit('rates', {payload: data});
            });
        });
  
        socket.addEventListener('error', function (event) {
            console.error('WebSocket error:', event);
        });
  
        const unsubscribe = function(symbol) {
            socket.send(JSON.stringify({'type': 'unsubscribe', 'symbol': symbol}));
        }
    }
}