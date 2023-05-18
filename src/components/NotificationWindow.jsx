import useUser from '@/hooks/useUser';
import { AlertCircle, CheckCircle2, X, XCircle } from 'lucide-react';
import { useRef } from 'react';

export default function NotificationWindow({ children, type, ...props }) {
  const { openNotificationWindow, openNotificationWindowError, setOpenNotificationWindow, setOpenNotificationWindowError, setTextNotification } = useUser()
  const notificationWinddow = useRef(null)

  function handleClearNotificationWindow() {
    if (notificationWinddow.current) {
      notificationWinddow.current.classList.remove('animate-slide-in');
      notificationWinddow.current.classList.add('animate-slide-out');

      if (openNotificationWindow) {
        setTimeout(() => {
          setOpenNotificationWindow(false)
          setTextNotification('')
        }, 300);
      } else {
        setTimeout(() => {
          setOpenNotificationWindowError(false)
          setTextNotification('')
        }, 300);
      }
    }
  }
  return (
    <div
      ref={notificationWinddow}
      className={`flex items-center justify-between absolute right-0 bottom-[20.5px] rounded-ten shadow-notify-window py-3.5 px-4 w-auto h-14 animate-slide-in
      ${type === 'not-charges' && 'bg-[#F2D6D0]'}
      ${type === 'not-delete' && 'bg-[#F2D6D0]'}
      ${type === 'accept' && 'bg-[#C3D4FE]'}
      ${openNotificationWindow || openNotificationWindowError ? "slide-in" : "opacity-0 pointer-events-none"}
      `}
      {...props}
    >
      {type === 'not-charges' &&
        <div className='flex items-center gap-2 pl-2 font-nunito text-sm text-[#AE1100]'>
          <AlertCircle size={20} stroke='#AE1100' />
          <span>{children}</span>
        </div>
      }
      {type === 'not-delete' &&
        <div className='flex items-center gap-2 pl-2 font-nunito text-sm text-[#AE1100]'>
          <XCircle size={20} stroke='#AE1100' />
          <span>{children}</span>
        </div>
      }
      {type === 'accept' &&
        <div className='flex items-center gap-2 pl-2 font-nunito text-sm text-[#243F80]'>
          <CheckCircle2 size={18} stroke='#243F80' />
          <span>{children}</span>
        </div>
      }
      <X
        size={15}
        className='cursor-pointer'
        onClick={handleClearNotificationWindow}
      />
    </div>
  );
}

