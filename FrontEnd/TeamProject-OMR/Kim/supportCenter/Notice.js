import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Header from "../../Heo/components/Header";
import { SupportNavbar } from "./SupportNavbar";

// 공지사항 샘플 데이터
const noticeData = [
  {
    id: 1,
    title: "[중요] 서비스 점검 안내",
    date: "2024-01-20",
    category: "시스템",
    isImportant: true,
    isNew: true,
    content: `안녕하세요. 더 나은 서비스 제공을 위해 시스템 점검을 실시합니다.

              점검 일시: 2024년 1월 25일 (목) 02:00 ~ 06:00 (4시간)
              점검 내용: 
              - 서버 안정성 개선
              - 새로운 기능 업데이트 준비
              - 보안 강화 작업

              점검 시간 동안에는 서비스 이용이 일시적으로 중단될 수 있습니다.
              이용에 불편을 드려 죄송합니다.

              감사합니다.`
  },
  {
    id: 2,
    title: "새로운 기능 업데이트 소식",
    date: "2024-01-18",
    category: "업데이트",
    isImportant: false,
    isNew: true,
    content: `새로운 기능이 추가되었습니다!

              주요 업데이트 내용:
              1. 다크 모드 지원
              2. 알림 설정 세분화
              3. 검색 기능 개선
              4. 사용자 인터페이스 개선

              앱 스토어에서 최신 버전으로 업데이트해주세요.
              더 나은 사용 경험을 제공하겠습니다.`
  },
  {
    id: 3,
    title: "개인정보 처리방침 변경 안내",
    date: "2024-01-15",
    category: "정책",
    isImportant: true,
    isNew: false,
    content: `개인정보 처리방침이 변경되었습니다.

              변경 사항:
              - 개인정보 수집 목적 명시 강화
              - 개인정보 보관 기간 조정
              - 제3자 제공 관련 내용 추가

              변경된 개인정보 처리방침은 2024년 1월 20일부터 적용됩니다.
              자세한 내용은 앱 내 '개인정보 처리방침'에서 확인하실 수 있습니다.`
  },
  {
    id: 4,
    title: "고객센터 운영시간 변경",
    date: "2024-01-12",
    category: "고객센터",
    isImportant: false,
    isNew: false,
    content: `고객센터 운영시간이 변경되었습니다.

              기존: 평일 09:00 ~ 18:00
              변경: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00

              더 많은 시간 동안 고객님께 도움을 드릴 수 있게 되었습니다.
              언제든지 문의해주세요!`
  },
  {
    id: 5,
    title: "설 연휴 고객센터 운영 안내",
    date: "2024-01-10",
    category: "고객센터",
    isImportant: false,
    isNew: false,
    content: `설 연휴 기간 고객센터 운영 안내드립니다.

              휴무 기간: 2024년 2월 9일(금) ~ 2월 12일(월)
              정상 운영: 2024년 2월 13일(화)부터

              휴무 기간 중 긴급 문의사항은 앱 내 '문의하기'를 통해 접수해주시면,
              연휴 후 순차적으로 답변드리겠습니다.`
  }
];

const categoryColors = {
  '시스템': '#FF6B6B',
  '업데이트': '#4ECDC4', 
  '정책': '#45B7D1',
  '고객센터': '#96CEB4',
  '이벤트': '#FECA57'
};

const NoticeItem = ({ item, isExpanded, onToggle }) => (
  <View style={styles.noticeItem}>
    <TouchableOpacity style={styles.noticeHeader} onPress={onToggle}>
      <View style={styles.noticeInfo}>
        <View style={styles.titleRow}>
          {item.isImportant && (
            <View style={styles.importantBadge}>
              <Text style={styles.importantText}>중요</Text>
            </View>
          )}
          {item.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          )}
          <View style={[styles.categoryBadge, { backgroundColor: categoryColors[item.category] }]}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.noticeTitle}>{item.title}</Text>
        <Text style={styles.noticeDate}>{item.date}</Text>
      </View>
      <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
    </TouchableOpacity>
    
    {isExpanded && (
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{item.content}</Text>
      </View>
    )}
  </View>
);

export const Notice = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showNewInquiry, setShowNewInquiry] = useState(false);
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');

  const categories = ['전체', '시스템', '업데이트', '정책', '고객센터', '이벤트'];

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredNotices = selectedCategory === '전체' 
    ? noticeData 
    : noticeData.filter(notice => notice.category === selectedCategory);

  const handleNewInquiry = () => {
    setShowNewInquiry(true);
  };
  
  const handleSubmitInquiry = () => {
    if (inquiryTitle.trim() && inquiryContent.trim()) {
      // 문의 제출 로직
      console.log('문의 제출:', { title: inquiryTitle, content: inquiryContent });
      setInquiryTitle('');
      setInquiryContent('');
      setShowNewInquiry(false);
      alert('문의가 성공적으로 접수되었습니다.');
    } else {
      alert('제목과 내용을 모두 입력해주세요.');
    }
  };

  const handleCancel = () => {
    setShowNewInquiry(false);
    setInquiryTitle('');
    setInquiryContent('');
  };

  // 글 작성하기
  if (showNewInquiry) {
    return (
      <>
        <Header />
        <SupportNavbar />
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>새 문의 작성</Text>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>문의 제목</Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder="문의 제목을 입력해주세요"
                  value={inquiryTitle}
                  onChangeText={setInquiryTitle}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>문의 내용</Text>
                <TextInput
                  style={styles.contentInput}
                  placeholder="문의 내용을 자세히 입력해주세요"
                  value={inquiryContent}
                  onChangeText={setInquiryContent}
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.secondaryButton]} 
                  onPress={handleCancel}
                >
                  <Text style={styles.secondaryButtonText}>취소</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.primaryButton]} 
                  onPress={handleSubmitInquiry}
                >
                  <Text style={styles.primaryButtonText}>문의 제출</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  

  return (
    <>
      <Header />
      <SupportNavbar />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerSection}> 
            <Text style={styles.title}>공지사항</Text>
            <TouchableOpacity 
              style={styles.newInquiryButton} 
              onPress={handleNewInquiry}
            >
            <Text style={styles.newInquiryButtonText}>+ 새 공지사항</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            서비스 관련 중요한 소식을 확인하세요.
          </Text>
          
          {/* 카테고리 필터 */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* 공지사항 목록 */}
          <View style={styles.noticeContainer}>
            {filteredNotices.map((item) => (
              <NoticeItem
                key={item.id}
                item={item}
                isExpanded={expandedItems.has(item.id)}
                onToggle={() => toggleExpanded(item.id)}
              />
            ))}
          </View>

          {filteredNotices.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>해당 카테고리의 공지사항이 없습니다.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newInquiryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newInquiryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  noticeContainer: {
    marginBottom: 32,
  },
  noticeItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  noticeInfo: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  importantBadge: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  importantText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 4,
  },
  newText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 4,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  noticeDate: {
    fontSize: 12,
    color: '#999',
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 12,
    whiteSpace: 'pre-line',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});