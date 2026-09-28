import { useEffect } from "react";
import AppRouter  from "./router";
import eventEmitter from "./utils/event-emitter";
import {App as AntdApp} from 'antd';
const App = () => {
  const _antdApp = AntdApp.useApp();
  const handleError = (arg: string) => {
    console.log('触发全局异常事件');
      _antdApp.message.error(arg);
  }
  useEffect(() => {
    // 监听全局异常事件
    eventEmitter.on('API:SERVER_ERROR', handleError);
    return ()=>{
      // 卸载事件监听器
      eventEmitter.off('API:SERVER_ERROR', handleError);
    }
  }, []);
  return (
      <AppRouter />
  )
}
export default App;