import { useContext, useState } from "react";
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../All/context/UserContext";
import { API } from "../../All/api/API";

export const NoticeItem = ({ item, isExpanded, onToggle, onUpdated, onDeleted }) => {

  // 수정모드
  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newContent, setNewContent] = useState(item.content);
  const [newImportant, setNewImportant] = useState(item.important);
  const [newNew, setNewNew] = useState(item.new);

  const { user } = useContext(UserContext);
  const categoryColors = {
    '시스템': '#FF6B6B',
    '업데이트': '#4ECDC4',
    '정책': '#45B7D1',
    '고객센터': '#96CEB4',
    '이벤트': '#FECA57'
  };

  // 수정하기
  const handleUpdate = async () => {

    if (!showEdit) {
      setShowEdit(true);
    } else {
      const data = {
        ...item,
        title: newTitle,
        content: newContent,
        updatedAt: new Date(),
      }

      try {
        const connect = await fetch(`${API}/api/notice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const response = await connect.json();

        console.log(response)
        setShowEdit(false)
        onUpdated();
      } catch (error) {
        console.log(error)
        Alert.alert("오류", "수정하기 오류")
      }
    }
  }

  // 삭제하기
// 삭제하기
const handleDelete = (id) => {

  const confirmDelete = async () => {
    try {
      const connect = await fetch(`${API}/api/notice/${id}`, {
        method: "DELETE"
      });
      const result = await connect.json();

      if (result.result) {
        Alert.alert("삭제 성공", "공지사항이 삭제되었습니다.");
        onDeleted(id); 
      } else {
        Alert.alert("실패", "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("오류", "삭제하기 오류");
    }
  };

  Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
    {
      text: "취소",
      style: "cancel"
    },
    {
      text: "삭제",
      style: "destructive",
      onPress: confirmDelete
    }
  ]);
};


  return (

    <View style={styles.noticeItem}>
      <TouchableOpacity style={styles.noticeHeader} onPress={onToggle}>
        <View style={styles.noticeInfo}>
          <View style={styles.titleRow}>
            {item.important && (
              <View style={styles.importantBadge}>
                {!showEdit && <Text style={styles.importantText}>중요</Text>}
                {showEdit &&
                  <>
                    <Text style={styles.toggleLabel}>NEW 뱃지</Text>
                    <Switch
                      value={newImportant}
                      onValueChange={setNewImportant}
                      trackColor={{ false: '#D1D5DB', true: '#EF4444' }}
                      thumbColor={newImportant ? '#FFFFFF' : '#F3F4F6'}
                    /></>}
              </View>
            )}
            {item.new && (
              <View style={styles.newBadge}>
                {!showEdit && <Text style={styles.newText}>NEW</Text>}
                {showEdit && <>
                  <Text style={styles.toggleLabel}>NEW 뱃지</Text>
                  <Switch
                    value={newNew}
                    onValueChange={setNewNew}
                    trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                    thumbColor={newNew ? '#FFFFFF' : '#F3F4F6'}
                  />
                </>}
              </View>
            )}
            <View style={[styles.categoryBadge, { backgroundColor: categoryColors[item.category] }]}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          {!showEdit && <Text style={styles.noticeTitle}>{item.title}</Text>}
          {showEdit && <TextInput style={styles.editTrue}
            value={newTitle} onChangeText={text => setNewTitle(text)} />}
          <Text style={styles.noticeDate}>{item.updatedAt.slice(0, 10)}</Text>
        </View>

        {user?.id === 1 && <View style={styles.editButtonContainer}>
          <TouchableOpacity
            style={styles.newFAQButton}
            onPress={handleUpdate}
          >
            <Text style={styles.newFAQButtonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.newFAQButton}
            onPress={()=>handleDelete(item.id)}
          >
            <Text style={styles.newFAQButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>}
        <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.contentContainer}>
          {!showEdit && <Text style={styles.contentText}>{item.content}</Text>}
          {showEdit && <TextInput style={styles.editTrue}
            value={newContent} onChangeText={text => setNewContent(text)} />}
        </View>
      )}
    </View>
  )
};

const styles = StyleSheet.create({
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
  editButtonContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 5
  },
  newFAQButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newFAQButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  editTrue: {
    borderRadius: 8,
    backgroundColor: '#FFFACD',
    padding: 10,
  }

});
