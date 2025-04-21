import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal.Overlay> = {
  title: 'Common/Modal',
  component: Modal.Overlay, // ← Overlay를 primary component로
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal.Overlay>;

//
// 기본 Alert 모달 예시
//
export const AlertModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>Alert 모달 열기</button>
        <Modal.Overlay open={open} onClose={() => setOpen(false)}>
          <Modal.Layout>
            <Modal.Content>
              <Modal.ModalTextContent
                title="로그아웃"
                description="로그아웃 하시겠습니까?"
              />
            </Modal.Content>
            <Modal.Footer hasTopBorder={false}>
              <Modal.DoubleCTA
                cancelText="취소"
                confirmText="로그아웃"
                cancelProps={{
                  onClick: () => setOpen(false),
                  variant: 'basic',
                }}
                confirmProps={{
                  onClick: () => {
                    alert('로그아웃 완료');
                    setOpen(false);
                  },
                  variant: 'main',
                }}
              />
            </Modal.Footer>
          </Modal.Layout>
        </Modal.Overlay>
      </>
    );
  },
};

//
// 복잡한 동아리 검색 모달 예시
//
export const ComplexModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button onClick={() => setOpen(true)}>검색 모달 열기</button>
        <Modal.Overlay open={open} onClose={() => setOpen(false)}>
          <Modal.Layout>
            <Modal.Header text="동아리 검색" />
            <Modal.Content>
              <div style={{ paddingBottom: '1rem' }}>
                <input
                  placeholder="동아리명을 입력해주세요."
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '0.8rem',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
              <ul
                style={{
                  maxHeight: '20rem',
                  overflowY: 'auto',
                  margin: 0,
                  padding: 0,
                }}
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <li
                    key={i}
                    style={{
                      listStyle: 'none',
                      padding: '1rem 0',
                      borderBottom: '1px solid #eee',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>동아리명 {i + 1}</span>
                    <input type="checkbox" defaultChecked />
                  </li>
                ))}
              </ul>
            </Modal.Content>
            <Modal.Footer hasTopBorder>
              <Modal.DoubleCTA
                cancelText="닫기"
                confirmText="확인"
                cancelProps={{ onClick: () => setOpen(false) }}
                confirmProps={{ onClick: () => alert('확인') }}
              />
            </Modal.Footer>
          </Modal.Layout>
        </Modal.Overlay>
      </>
    );
  },
};
