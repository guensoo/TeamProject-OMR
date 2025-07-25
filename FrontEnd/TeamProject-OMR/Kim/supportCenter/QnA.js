import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Header from "../../Heo/components/Header";
import { SupportNavbar } from "./SupportNavbar";

// 이전 문의 내역 샘플 데이터
const inquiryHistory = [
  {
    id: 1,
    title: "결제 오류 문의",
    date: "2024-01-15",
    status: "답변완료",
    preview: "결제 진행 중 오류가 발생했습니다...",
    answer: "안녕하세요. 문의해주신 결제 오류 건에 대해 답변드립니다. 결제 시스템 점검으로 인한 일시적 오류였으며, 현재는 정상 처리되고 있습니다."
  },
  {
    id: 2,
    title: "계정 로그인 문제",
    date: "2024-01-12",
    status: "처리중",
    preview: "로그인이 되지 않아서 문의드립니다...",
    answer: null
  },
  {
    id: 3,
    title: "앱 사용법 문의",
    date: "2024-01-10",
    status: "답변완료",
    preview: "새로운 기능 사용 방법을 알고 싶습니다...",
    answer: "문의하신 기능은 메인 화면 하단의 '더보기' 메뉴에서 찾으실 수 있습니다. 자세한 사용법은 앱 내 도움말을 참고해주세요."
  }
];

const InquiryItem = ({ item, isExpanded, onToggle }) => (
  <View style={styles.inquiryItem}>
    <TouchableOpacity style={styles.inquiryHeader} onPress={onToggle}>
      <View style={styles.inquiryInfo}>
        <Text style={styles.inquiryTitle}>{item.title}</Text>
        <Text style={styles.inquiryDate}>{item.date}</Text>
        <Text style={styles.inquiryPreview}>{item.preview}</Text>
      </View>
      <View style={styles.inquiryRight}>
        <View style={[styles.statusBadge, 
          item.status === '답변완료' ? styles.completedBadge : styles.pendingBadge
        ]}>
          <Text style={[styles.statusText,
            item.status === '답변완료' ? styles.completedText : styles.pendingText
          ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
      </View>
    </TouchableOpacity>
    
    {isExpanded && item.answer && (
      <View style={styles.answerContainer}>
        <Text style={styles.answerLabel}>답변</Text>
        <Text style={styles.answerText}>{item.answer}</Text>
      </View>
    )}
    
    {isExpanded && !item.answer && (
      <View style={styles.answerContainer}>
        <Text style={styles.pendingAnswer}>답변 준비 중입니다. 조금만 기다려주세요.</Text>
      </View>
    )}
  </View>
);

export const QnA = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [showNewInquiry, setShowNewInquiry] = useState(false);
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContent, setInquiryContent] = useState('');

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

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
            <Text style={styles.title}>나의 문의 내역</Text>
            <TouchableOpacity 
              style={styles.newInquiryButton} 
              onPress={handleNewInquiry}
            >
              <Text style={styles.newInquiryButtonText}>+ 새 문의</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>
            문의하신 내용과 답변을 확인하실 수 있습니다.
          </Text>
          
          <View style={styles.inquiryContainer}>
            {inquiryHistory.map((item) => (
              <InquiryItem
                key={item.id}
                item={item}
                isExpanded={expandedItems.has(item.id)}
                onToggle={() => toggleExpanded(item.id)}
              />
            ))}
          </View>

          {inquiryHistory.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>아직 문의 내역이 없습니다.</Text>
              <Text style={styles.emptySubtext}>궁금한 점이 있으시면 언제든 문의해주세요.</Text>
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
  content: {
    padding: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  inquiryContainer: {
    marginBottom: 32,
  },
  inquiryItem: {
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
  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  inquiryInfo: {
    flex: 1,
    marginRight: 12,
  },
  inquiryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  inquiryDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  inquiryPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  inquiryRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  completedBadge: {
    backgroundColor: '#E8F5E8',
  },
  pendingBadge: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedText: {
    color: '#4CAF50',
  },
  pendingText: {
    color: '#FF9800',
  },
  expandIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 6,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pendingAnswer: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});