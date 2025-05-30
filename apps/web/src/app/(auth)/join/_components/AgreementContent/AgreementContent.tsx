'use client';

import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { dividerStyle } from '../JoinHeader/JoinHeader.css';

export const termsModalContent = (
  <Flex direction="column" gap="2rem">
    <Flex direction="column" gap="1.2rem">
      <Text variant="md2_text_semibold" color="grayscale90">
        제 1장 총칙
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제1조 [목적] 본 약관은 위더스가 해당 사이트를 통하여 제공하는 리크루팅
        자동화 통합 서비스(이하 “서비스”)의 이용에 관한 제반 사항을 규정하는
        것을 목적으로 합니다.
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제2조 [용어 정의] 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. ①
        “이용자”라 함은 “웹사이트”에 접속하여 본 약관에 따라 “단체”가 제공하는
        “서비스”를 이용하는 “회원”으로서 “관리자”와 “사용자”를 말합니다. ②
        “회원”이라 함은 “웹사이트”에 접속하여 본 약관에 동의함으로써 회원가입이
        승인된 자로서 “단체”가 제공하는 “서비스”를 지속적으로 이용할 수 있는
        자를 말합니다. ③ “비밀번호”라 함은 “서비스” 이용시, “이메일”와 일치되는
        “회원”임을 확인하고, 회원 개인정보 보호를 위하여, 회원 자신이 정한 문자
        또는 숫자의 조합을 말합니다. ④ “관리자”라 함은 회원가입 시, “관리자”를
        택한 회원으로서 본인 동아리의 “전체 관리자”를 말합니다. ⑤ “사용자”라
        함은 회원가입 시, “사용자”를 택한 회원으로서 본인 동아리의 “운영진”
        (이하 “평가 진행자”)를 말합니다. ⑥ “개인정보”라 함은 생존하는 개인에
        관한 정보로서 해당 정보에 포함되어 있는 성명, 주민등록번호 등의 사항에
        의하여 해당 개인을 식별할 수 있는 정보를 말합니다. ⑦ “부정이용자”는
        “단체”의 규정을 위반한 자로서, “단체”가 회원자격을 박탈시킨 날로부터
        또는 “부정이용자” 스스로가 규정 위반 후 탈퇴한 날로부터 1년간 “웹사이트”
        재가입이 불가한 자를 의미합니다.
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제3조 [약관의 효력과 변경] ① 본 약관은 “이용자”가 약관의 내용에 동의하며
        회원가입을 신청하고, “단체”가 그 신청에 대하여 승낙함으로써 효력이
        발생합니다. ② 개별 서비스 계약 시 동의한 약관이 본 약관과 저촉되는 경우
        개별 서비스 계약 시 동의한 약관이 우선 적용됩니다. ③ "회사"가 본 약관의
        내용을 변경하는 경우 적용일자 및 변경사유를 명시하여 전자적 수단(이메일,
        서비스 내 알림 등)을 통해 통지하거나 "웹사이트"에 공지하는 방법 등으로
        통지합니다. 또한 중대한 내용의 약관 변경의 경우에는 최소 30일 이전에
        전자적 수단(이메일, 서비스 내 알림 등)을 통해 통지하거나 "웹사이트"에
        공지하는 방법으로 통지할 수 있습니다. ④ 전항과 같이 약관의 변경에 대하여
        통지한 경우, 그 때부터 7일(이용자에게 불리하거나 중대한 사항의 변경인
        경우 30일)내에 이용자가 거절의 의사를 표시하지 않으면 변경된 약관에
        동의한 것으로 간주됩니다.
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제4조 [약관 외 준칙] 본 약관과 “웹사이트”에 명시되지 아니한 사항이
        관련법령 또는 회사가 정한 개별 서비스의 이용약관, 운영정책 및 규칙 등에
        규정되어 있을 경우에는 그 규정에 따릅니다.
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제5조 [회원에 대한 통지] ① “단체”는 “회원”에게 알려야 할 사항이 발생하는
        경우 "회원”에게 문자 또는 이메일 등으로 통지할 수 있습니다. ② 단체가
        “이용자” 전체에게 통지해야 하는 경우 전항의 통지 방법 대신 7일 이상
        “회사”의 “웹사이트” 게시판에 게시함으로써 전항의 통지에 갈음할 수
        있습니다.
      </Text>
    </Flex>
    <div className={dividerStyle} />

    <Flex direction="column" gap="1.2rem">
      <Text variant="md2_text_semibold" color="grayscale90">
        제 2 장 회원가입
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제6조 [회원가입] ① 회원가입은 “서비스”를 이용하려는 자가 본 약관의
        내용에 동의하고 회원가입 신청을 한 후 “회사”가 이러한 신청에 대하여
        승낙함으로써 완료됩니다. ② 전항의 규정에 따라 회원가입을 할 때에는
        “회사”가 제공하는 “서비스”의 원활한 이용을 위해서 필요한 “개인정보”를
        제공해야 합니다. 이 경우 제공되는 “개인정보”는 “회사”가 게시한
        개인정보처리방침에서 확인할 수 있습니다.
      </Text>
      <Text variant="sm_caption_medium" color="grayscale80">
        제7조 [회원가입 신청] ① “회원”으로 가입하여 “서비스”를 이용하기를
        희망하는 자는 “단체”가 요청하는 소정의 신규회원가입 양식에서 요구하는
        사항을 기록하여 신청합니다. ② 온라인 가입신청 양식에 기재하는 사항에
        실명이나 실제 정보를 입력하지 않은 자는 법적인 보호를 받을 수 없으며,
        “서비스” 사용의 제한을 받을 수 있습니다.
      </Text>
    </Flex>
  </Flex>
);

export const privacyModalContent = {
  admin: (
    <Flex direction="column" gap="2rem">
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          개인정보 처리 방침 (관리자)
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          위더스는 다음과 같이 이용자의 개인정보를 처리합니다. 이용자는 동의를
          거부할 권리가 있으나, 동의를 거부하는 경우 회원가입 및 서비스의 이용이
          제한됩니다.
        </Text>
        <Text variant="md2_text_semibold" color="grayscale90">
          수집/이용 항목
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          회원 유형(관리자), 이름, 소속 동아리, 이메일, 비밀번호, 핸드폰 번호
        </Text>
      </Flex>
      <div className={dividerStyle} />
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          수집/이용 목적
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          - 본인확인 및 가입 의사 확인, 서비스 제공 시 이용자 식별, 회원탈퇴
          의사의 확인 등 회원 관리 목적 - 법령 및 “회사”의 이용약관 등을
          위반하는 이용자에 대한 이용 제한 조치, 부정 이용 행위를 포함하여
          서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용
          및 부정거래방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록
          보존, 민원처리 등 이용자 보호 및 서비스 운영 목적
        </Text>
      </Flex>

      <div className={dividerStyle} />
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          보유기간
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          법령이 정하는 경우를 제외하고는 회원 탈퇴시까지 보유 및 이용합니다.
          단, 다음 각호는 예외로 합니다. 1. 비정상적인 회원탈퇴 등으로 인한 피해
          예방을 위하여 회원 탈퇴 시점으로부터 7일간 보유 및 이용합니다. 2.
          부정한 이용으로 적발된 부정이용자에 한하여 회원 탈퇴시점으로부터 1년간
          보유 및 이용합니다.
        </Text>
      </Flex>
    </Flex>
  ),
  user: (
    <Flex direction="column" gap="2rem">
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          개인정보 처리 방침 (사용자)
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          위더스는 다음과 같이 이용자의 개인정보를 처리합니다. 이용자는 동의를
          거부할 권리가 있으나, 동의를 거부하는 경우 회원가입 및 서비스의 이용이
          제한됩니다.
        </Text>
        <Text variant="md2_text_semibold" color="grayscale90">
          수집/이용 항목
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          회원 유형(사용자), 이름, 생년월일, 성별, 소속 동아리, 이메일,
          비밀번호, 핸드폰 번호
        </Text>
      </Flex>
      <div className={dividerStyle} />
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          수집/이용 목적
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          - 본인확인 및 가입 의사 확인, 서비스 제공 시 이용자 식별, 회원탈퇴
          의사의 확인 등 회원 관리 목적 - 법령 및 “회사”의 이용약관 등을
          위반하는 이용자에 대한 이용 제한 조치, 부정 이용 행위를 포함하여
          서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재, 계정도용
          및 부정거래방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록
          보존, 민원처리 등 이용자 보호 및 서비스 운영 목적활한 운영에 지장을
          주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래방지, 약관 개정
          등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호
          및 서비스 운영 목적
        </Text>
      </Flex>

      <div className={dividerStyle} />
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          보유기간
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          법령이 정하는 경우를 제외하고는 회원 탈퇴시까지 보유 및 이용합니다.
          단, 다음 각호는 예외로 합니다. 1. 비정상적인 회원탈퇴 등으로 인한 피해
          예방을 위하여 회원 탈퇴 시점으로부터 7일간 보유 및 이용합니다. 2.
          부정한 이용으로 적발된 부정이용자에 한하여 회원 탈퇴시점으로부터 1년간
          보유 및 이용합니다.
        </Text>
      </Flex>
    </Flex>
  ),
};

/*export default function AgreementContent() {
  return (
    <Flex direction="column" gap="2rem">
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 1조 [목적]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>

      <div className={dividerStyle} />

      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 2조 [정의]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>

      <div className={dividerStyle} />

      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 3조 [약관의 효력]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>
    </Flex>
  );
}
*/
