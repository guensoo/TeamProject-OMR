import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NoticeItem = ({ item, isExpanded, onToggle }) => {
    const categoryColors = {
        '시스템': '#FF6B6B',
        '업데이트': '#4ECDC4',
        '정책': '#45B7D1',
        '고객센터': '#96CEB4',
        '이벤트': '#FECA57'
};
    return(
    
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
)};

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
});
