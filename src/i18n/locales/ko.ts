import type { Locale } from '../index';

const ko: Locale = {
	'period.weekly': '주간 노트',
	'period.monthly': '월간 노트',
	'period.yearly': '연간 노트',
	'period.label.weekly': '주간',
	'period.label.monthly': '월간',
	'period.label.yearly': '연간',

	'command.open': '{period} 열기',
	'command.findByDate': '날짜로 주기 노트 찾기',

	'picker.placeholder': '날짜를 YYYY-MM-DD 형식으로 입력하세요',
	'picker.invalidDate': '유효하지 않은 날짜입니다.',
	'picker.copy': '주간 노트 이름 복사',
	'picker.create': '{period} 만들기',
	'picker.navigate': '이동',
	'picker.choose': '실행',
	'picker.close': '닫기',

	'settings.openInNewTab.name': '새 탭에서 열기',
	'settings.openInNewTab.desc': '현재 탭을 바꾸는 대신 새 탭에서 노트를 엽니다.',
	'settings.heading.weekly': '주간 노트',
	'settings.heading.monthly': '월간 노트',
	'settings.heading.yearly': '연간 노트',
	'settings.enable.name': '사용',
	'settings.enable.desc':
		'"{command}" 명령, 리본 동작, 날짜 조회에서 이 노트를 열거나 만듭니다. 리본 표시 여부는 Obsidian 설정에서 관리합니다.',
	'settings.format.name': '이름 형식',
	'settings.format.desc': 'Moment.js 형식으로 파일명을 정합니다. 저장 위치는 폴더 설정을 사용합니다. ',
	'settings.format.reference': '형식 문법 보기',
	'settings.format.current': '현재 노트: ',
	'settings.folder.name': '폴더',
	'settings.folder.desc': '새 노트를 이 폴더에 만듭니다. 비워 두면 보관소 루트에 만듭니다.',
	'settings.folder.placeholder': '예: 일지/{label}',
	'settings.template.name': '템플릿 파일',
	'settings.template.desc':
		'노트를 새로 만들 때 적용합니다. {{title}}, {{date}}, {{time}}, {{start}}, {{end}}를 쓸 수 있고, 각각 뒤에 :형식을 붙일 수 있습니다.',
	'settings.template.placeholder': '예: 템플릿/{label}',

	'notice.periodDisabled': '{period} 사용이 꺼져 있습니다. 플러그인 설정에서 켜 주세요.',
	'notice.invalidName': '{period} 이름 형식을 확인해 주세요. 파일명은 비어 있거나 /, \\를 포함할 수 없습니다.',
	'notice.copied': '복사했습니다: {name}',
	'notice.copyFailed': '클립보드에 복사하지 못했습니다.',
	'notice.pathIsFolder': '노트를 만들 수 없습니다. "{path}"은(는) 폴더입니다.',
	'notice.pathIsFile': '"{path}"은(는) 폴더가 아니라 파일입니다.',
	'notice.templateNotFound': '템플릿을 찾을 수 없습니다: {path}',
	'notice.openFailed': '{period}을(를) 열지 못했습니다: {message}',
};

export default ko;
