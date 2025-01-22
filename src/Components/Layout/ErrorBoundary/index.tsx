import withLazyLoading from '@/Utils/LazyLoading';
import React, { Component } from 'react';
const ResultComponent = withLazyLoading(() => import('@/Components/UIElements/Feedback/Result'),{PageLoading:false});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });

    console.error("Error Boundary Caught an Error:", {
      error: error,
      errorInfo: errorInfo
    });
  }

  handleBackHome = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <ResultComponent 
          text={`نود إعلامكم بوجود مشكلة تتطلب اهتمامكم العاجل. يرجى مراجعة التفاصيل الآتية لفهم القضية بشكل أفضل والعمل على حلها بأسرع وقت ممكن.`}
          Submit='العودة الى الصفحة الرئيسية'
          cancel=''
          handleSubmit={this.handleBackHome}
          handleClose={this.handleBackHome}
          title='لقد حدثت مشكلة ما !'
          icons='failed'
        />
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
