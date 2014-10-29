import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JWindow;


public class Main {

	public final static int Height = 500;
	public final static int Width = 500;
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		JApplet gameFrame = new JApplet();
		
		gameFrame.setSize(Height,Width);
		gameFrame.setVisible(true);
		JPanel myPanel = new JPanel();
		
		//Make the game component and add it to Frame.
		gameComponent component = new gameComponent();
		myPanel.add(component);
		gameFrame.add(component);
	}

}
